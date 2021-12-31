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
    var date = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
    console.log(date);

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
    conn.execute("select email,name,role,flag from users where flag=true", function (err, result) {
        if (err) {
            console.log("select 실패");
        }
        console.log("select 성공");
        console.log(result.rows);

        res.status(200).json({
            permitlist: result.rows
        })
    })
});

// 권한 승인
router.post("/permit", function (req, res) {
    // const param = ["admin", "true", req.body.email]
    const userEmail = req.body.email
    conn.execute("UPDATE USERS SET ROLE = 'admin', FLAG = 'true' WHERE EMAIL =:useremail",[userEmail], function (err, result) {
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

// 가입자 수
router.get("/list", function (req, res) {
    conn.execute("select email,name,role,flag from users", function (err, result, fields) {
        if (err) {
            console.log("조회 실패");
        }
        console.log("조회 성공");
        console.log(result.rows);
        res.status(200).json({
            userlist: result.rows
        })
    })
});


module.exports = router;