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

router.get('/wws', (req, res) => {
    res.cookie("test_cookie", "test_cookie")
        .status(200)
        .json({
            msg: "쿠키 넣음"
        })
})

router.get('/wwa', (req, res) => {

    const wwa = req.cookies.test_cookie
    console.log("wwa: ", wwa)
    res.status(200)
        .json({
            cookie: wwa,
            msg: "쿠키 확인"
        })
})

// visitor counter
router.get('/count', (req, res) => {

    var countCookie = req.cookies.visitor_cookie
    console.log("젤 윗줄 countCookie: ", countCookie)
    
    var now = new Date();
    var date = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
    var currentTime = (now.getHours() * 3600) + (now.getMinutes() * 60);


    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
console.log("utcNow?? ",utcNow)
console.log("koreaTimeDiff?? ",koreaTimeDiff)

console.log("Date?? ",new Date())

console.log("한국시간은?? ",koreaNow)


console.log("now는???",now)
    if (countCookie === undefined) {
        console.log("여기옴???")
        conn.execute("select * from VISITOR_TABLE where VISITOR_DATE =:visitor_date", [date], function (err2, res2) {
            if (err2) {
                console.log(err2)
                // 이미 있다면
            } if (res2.rows != 0) {
                conn.execute("update VISITOR_TABLE set VISITOR_COUNT = VISITOR_COUNT+1 where VISITOR_DATE =:visitor_date", [date], function (err4, res4) {
                    if (err4) { console(err4) }
                    else{
                        console.log("update visitor성공")
                    }   
                    res.cookie("visitor_cookie", "date")
                        .status(200)
                        .json({
                            msg:"visiotr_cookie",
                            cookie:countCookie
                        })
                })
                //없다면
            } else {
                conn.execute("insert into VISITOR_TABLE(VISITOR_DATE,VISITOR_COUNT) values(:visitor_date,0)", [date], function (err3, res3) {
                    if (err3) { console.log(err3) }else{
                    console.log("insert visitor성공")
                     res.cookie("visitor_count", "date", { maxAge: 86400 - currentTime })
                        .status(200)
                        .json({
                            msg:"visiotr_cookie",
                            cookie:countCookie
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
                    FROM USERS NATURAL JOIN ATTACHMENT WHERE USERS.EMAIL = ATTACHMENT.USER_EMAIL";
    
    // console.log('query result', query);
    conn.execute(query ,[], {outFormat:oracledb.OBJECT}, function (err, result) {
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


// 권한 승인
router.post("/permit", function (req, res) {
    const userEmail = req.body.email
    console.log("서버에서 받은 이메일?", userEmail)

    conn.execute("UPDATE USERS SET ROLE = 'prof', FLAG = 'false' WHERE EMAIL =:useremail", [userEmail], function (err, result) {
        if (err) {
            console.log(err)
            console.log("update 실패");
        }
        else {
            console.log("update 성공");
            // console.log(result);
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

// role마다 유저 나눔
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