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


// 방문자수 카운트
router.get('/count', (req, res) => {

    const countCookie = req.cookies.visirot_count

    var now = new Date();
    var date = now.getFullYear() + now.get+ "/" + (now.getMonth() + 1) + "/" + now.getDate();
    console.log("123123123",typeof(date));

    var currentTime = (now.getHours() * 3600) + (now.getMinutes() * 60);
    console.log(currentTime);
    // res.cookie("visitor_count",date)

    if (countCookie === null || countCookie === undefined) {
        conn.execute("select * from VISITOR where VISITOR_DATE =:visitor_date", [date], function (err, res2) {
            if (err) {
                console.log(err)
                // 이미 있다면
            } if (res2.rows != 0) {
                conn.execute("update VISITOR set VISITOR_COUNT = VISITOR_COUNT+1 where VISITOR_DATE =:visitor_date", [date], function (err4, res4) {
                    if (err4) { console(err4) }
                    console.log("update visitor성공")
                })
                //없다면
            } else {
                conn.execute("insert into visitor values(:visitor_date,0)", [date], function (err3, res3) {
                    if (err3) { console.log(err3) }
                    console.log("insert visitor성공")
                    //24시간 - 지금시간 까지 유효기간
                    res.cookie("visirot_count", data, { maxAge: 86400 - currentTime })
                })
            }

        })
    }
})


// 권한 승인 요청 리스트
router.get("/permitlist", function (req, res) {
    conn.execute("SELECT EMAIL,NAME,ROLE,FLAG FROM USERS WHERE FLAG='true'",[], {outFormat:oracledb.OBJECT},function (err, result) {
        if (err) {
            console.log(err);
        }
        // console.log("select 성공");
        // console.log(result.rows);

        res.json({
            permitlist: result.rows
        })
    })
});

// 권한 승인
router.post("/permit", function (req, res) {
    // const param = ["admin", "true", req.body.email]
    const userEmail = req.body.email
    conn.execute("UPDATE USERS SET ROLE = 'prof', FLAG = 'false' WHERE EMAIL =:useremail",[userEmail], function (err, result) {
        if (err) {
            console.log(err)
            console.log("update 실패");
        }
        else{
        console.log("update 성공");
        // console.log(result);
        res.status(200).json({
            msg:"승인처리되었습니다."
        })
    }
    })
});




// 방문자 수
router.get("/visitors", function (req, res) {
    conn.execute("select sum(visitor_count) from visitor", function (err, result) {
        if (err) {
            console.log("조회 실패");
        }
        console.log("조회 성공");
        console.log(result.rows);
        res.status(200).json(result.rows[0][0])
    })
});

// 가입유저수
router.get("/users", function (req, res) {
    conn.execute("select count(*) from users", function (err, result) {
        if (err) {
            console.log("조회 실패");
        }
        res.status(200).json(result.rows[0][0])
    })
});



// 방 개설수
router.get("/rooms", function (req, res) {
    conn.execute("select count(*) from rooms", function (err, result) {
        if (err) {
            console.log("조회 실패");
        }
        res.status(200).json(result.rows[0][0])
    })
});

// SELECT
// count( DECODE (role, 'general',1) ) AS general,
// count( DECODE (role, 'prof',1) ) AS prof,
// count(*) as total
// from users;

router.get("/usertest", function (req, res) {
    conn.execute("SELECT count( DECODE (role, 'general',1) ) AS general, count( DECODE (role, 'prof',1) ) AS prof, count(*) as total from users", function (err, result) {
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