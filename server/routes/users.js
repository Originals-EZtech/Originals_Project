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
        console.log(result.rows);
        console.log("조회 성공");
        res.send(result.rows)
    }
    )
});

// signup
router.post("/register", function (req, res) {
    const param = [req.body.id, req.body.pw]

    bcrypt.hash(param[1], saltRounds, (err, hash) => {
        param[1] = hash

        conn.execute('insert into test (ID, PW) values(:ID,:PW)', param, function (err, result, fields) {
            if (err) {
                console.log("insert 실패");
            }
            res.send(param);
            console.log(result);
            console.log("insert 성공");
        })
    })


});



module.exports = router;