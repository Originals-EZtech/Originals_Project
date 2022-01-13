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

router.get("/userlog", function (req, res) {
    conn.execute("SELECT * FROM USERLOG_TABLE ORDER BY USERLOG_DATE DESC",[],{ outFormat: oracledb.OBJECT }, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.status(200).json({list:result.rows})
    })
});


router.get("/errorlog", function (req, res) {
    conn.execute("SELECT * FROM ERRORLOG_TABLE ORDER BY ERRORLOG_DATE DESC",[],{ outFormat: oracledb.OBJECT }, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result)
        res.status(200).json({list:result.rows})
    })
});


module.exports = router;