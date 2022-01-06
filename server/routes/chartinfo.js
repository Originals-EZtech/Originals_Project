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
    var date = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate(); // 현재시간 YYYY/MM/DD으로 format
    var currentTime = ((now.getHours() * 3600) + (now.getMinutes() * 60)) * 1000; // 현재 시간 ms로 변환

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

/**
 * 승인요청 리스트
 * user_table에서 flag = true를 가진 user만 가져옴
 */
router.get("/permitlist", function (req, res) {
    const query = "SELECT U.USER_EMAIL, U.USER_NAME, U.USER_ROLE, U.USER_FLAG, A.DIRECTORY \
                    FROM USER_TABLE U INNER JOIN ATTACHMENT A \
                    ON U.USER_EMAIL = A.USER_EMAIL \
                    WHERE U.USER_FLAG='true'";

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


// select * from visitor_table where createdate > (sysdate-7);
// 내일 배열 0~6 하나씩 빼자
router.get("/visitorlist", function (req, res) {
    conn.execute("SELECT VISITOR_COUNT from VISITOR_TABLE WHERE CREATEDATE > (SYSDATE-10) ORDER BY createdate", function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log("조회 성공",result.rows[1]);
        res.json({
            a: result.rows[0],
            b: result.rows[1],
            c: result.rows[2],
            d: result.rows[3],
            e: result.rows[4],
            f: result.rows[5],
            g: result.rows[6],
            h: result.rows[7],
            i: result.rows[8],
            j: result.rows[9],
            k: result.rows[10]
        })
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


// 최근 10일간 유저수
router.get("/signuplist", function (req, res) {
    const qry = "SELECT COUNT(*),TO_CHAR(USER_DATE,'YYYY-MM-DD') AS LOL FROM USER_TABLE \
                WHERE 1=1 AND USER_DATE >=SYSDATE-10 \
                GROUP BY TO_CHAR(USER_DATE,'YYYY-MM-DD') \
                ORDER BY LOL"
    
    conn.execute(qry, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result.rows[0][0])
        // res.send(result.rows)
        res.json({
            countA: result.rows[0][0],
            countB: result.rows[1][0],
            countC: result.rows[2][0],
            countD: result.rows[3][0],
            countE: result.rows[4][0],
            countF: result.rows[5][0],
            countG: result.rows[6][0],
            countH: result.rows[7][0],
            countI: result.rows[8][0],
            countJ: result.rows[9][0],
        })
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