const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const saltRounds = 10
oracledb.autoCommit = true;

//oracledb connection
var conn;
oracledb.getConnection(dbConfig, function (err, con) {
    if (err) {
        console.log('접속 실패', err);
        return;
    }
    conn = con;
    console.log('접속 성공');
});

// SELECT query test
router.get("/list", function (req, res) {

    conn.execute("select * from test", function (err, result, fields) {
        if (err) {
            console.log("조회 실패");
        }
        console.log(result);
        console.log(result.rows);
        console.log("조회 성공");
        res.send(result.rows)
    }
    )
});

// signup
router.post("/register", function (req, res) {
    const param = [req.body.id, req.body.pw]
    console.log("req: ", req.body)
    bcrypt.hash(param[1], saltRounds, (err, hash) => {
        param[1] = hash

        conn.execute('insert into test (ID, PW) values(:ID,:PW)', param, function (err, result, fields) {
            if (err) {
                console.log("insert 실패");
            }
            res.send(param);
            // console.log(result.rowsAffected);
            console.log("insert 성공");
        })
    })
});

//siginin
router.post("/login", function (req, res) {
    const paramid = [req.body.id]
    const parampw = [req.body.pw]
    console.log("req: ", req.body)
    
    conn.execute('select ID, PW from test where ID = :id ',paramid, function (err, result) {
        if(err) console.log("select err",err)
        // 아이디가 존재하지 않다면
        if (result.rows == 0) {
            console.log("select id 실패");
            res.send("아이디 없음");
            return;
        }
        // 아이디가 존재한다면
        bcrypt.compare(parampw,result.rows[0].pw,(err,resultt) => {
            // console.log("req.body.pw: ",req.body.pw);
            // console.log("result.rows[0][1]: ",result.rows[0][1]);
            // console.log(typeof(resultt))
            if(resultt){
                console.log(resultt)
                // res.send("비번 일치o")
                res.send(result.rows[0]);
                console.log("비밀번호 일치");
            }else{
                console.log("비밀번호가 틀렸습니다.")
                res.send("비밀번호가 틀렸습니다.")
            }
        })
    })
});





module.exports = router;