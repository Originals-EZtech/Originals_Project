const express = require('express');
const router = express.Router();
const dbConfig = require('../config/dbConfig');
const oracledb = require('oracledb');
oracledb.autoCommit = true;

var conn;
oracledb.getConnection(dbConfig, function (err, con) {
    if (err) {
        console.log('접속 실패', err);
        return;
    }
    conn = con;
});

/**
 * 메인페이지 접속 할시 방문자 카운트
 *   쿠키가 없다면 
 *   1) 카운트 +1
 *   2) 쿠키 발급후 만료 기한 해당 날짜 자정
 *   쿠키가 있다면 그냥 PASS 
 */
router.get('/count', (req, res) => {

    var countCookie = req.cookies.visitor_cookie
    var now = new Date();
    var date = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
    var currentTime = ((now.getHours() * 3600) + (now.getMinutes() * 60)) * 1000;

    if (countCookie === undefined) {
        conn.execute("select * from VISITOR_TABLE where VISITOR_DATE =:visitor_date", [date], function (err2, res2) {
            if (err2) {
                console.log(err2)
            } if (res2.rows != 0) {
                conn.execute("update VISITOR_TABLE set VISITOR_COUNT = VISITOR_COUNT+1 where VISITOR_DATE =:visitor_date", [date], function (err4, res4) {
                    if (err4) { console(err4) }
                    else {
                        console.log("update visitor성공")
                    }
                    res.cookie("visitor_cookie", "date", { maxAge: 86400000 - currentTime })
                        .status(200)
                        .json({
                            msg: "visiotr_cookie",
                            cookie: countCookie
                        })
                })
            } else {
                conn.execute("insert into VISITOR_TABLE(VISITOR_DATE,VISITOR_COUNT) values(:visitor_date,1)", [date], function (err3, res3) {
                    if (err3) { console.log(err3) } else {
                        console.log("insert visitor성공")
                        res.cookie("visitor_count", "date", { maxAge: 86400000 - currentTime })
                            .status(200)
                            .json({
                                msg: "visiotr_cookie",
                                cookie: countCookie
                            })
                    }
                })
            }

        })
    }

})


// 권한 승인 요청 리스트
router.get("/permitlist", function (req, res) {
    const query = "SELECT USERS.EMAIL, USERS.NAME, USERS.ROLE, USERS.FLAG, ATTACHMENT.DIRECTORY \
                    FROM USERS NATURAL JOIN ATTACHMENT WHERE USERS.EMAIL = ATTACHMENT.USER_EMAIL AND USERS.FLAG='true'";

    // console.log('query result', query);
    conn.execute(query, [], { outFormat: oracledb.OBJECT }, function (err, result) {
        if (err) {
            console.log(err);
        }
        // console.log("select 성공");
        console.log(result.rows);

        res.json({
            permitlist: result.rows
        })
    })
});


/**
 * 해당 USER의 ROLE 승인 받아야하는 리스트를 받고나서
 * 신청 flag컬럼을 변경(=FALSE) 
 * 동시에 ROLE 변경
 */
router.post("/permit", function (req, res) {
    const userEmail = req.body.email
    console.log("서버에서 받은 이메일?", userEmail)

    conn.execute("UPDATE USER_TABLE SET USER_ROLE = 'prof', USER_FLAG = 'false' WHERE USER_EMAIL =:useremail", [userEmail], function (err, result) {
        if (err) {
            console.log(err)
            console.log("update 실패");
        }
        else {
            console.log("update 성공");
            res.status(200).json({
                msg: "승인처리되었습니다."
            })
        }
    })
});



// 방문자 수
router.get("/visitors", function (req, res) {
    conn.execute("select sum(visitor_count) from visitor_table", function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log("조회 성공");
        console.log(result.rows);
        res.status(200).json(result.rows[0][0])
    })
});


// 가입유저수
router.get("/users", function (req, res) {
    conn.execute("select count(*) from USER_TABLE", function (err, result) {
        if (err) {
            console.log("조회 실패");
        }
        res.status(200).json(result.rows[0][0])
    })
});



// 방 개설수
router.get("/rooms", function (req, res) {
    conn.execute("select count(*) from ROOM_TABLE", function (err, result) {
        if (err) {
            console.log("조회 실패");
        }
        res.status(200).json(result.rows[0][0])
    })
});


/**
 * USER들의 ROLE마다 COUNT
 */
router.get("/usertest", function (req, res) {
    conn.execute("SELECT count( DECODE (USER_ROLE, 'general',1) ) AS general, count( DECODE (USER_ROLE, 'prof',1) ) AS prof, count(*) as total from USER_TABLE", function (err, result) {
        if (err) {
            console.log("조회 실패");
        }
        console.log(result.rows)
        res.status(200).json({
            general: result.rows[0][0],
            prof: result.rows[0][1],
            total: result.rows[0][2],
        })
    })
});


module.exports = router;