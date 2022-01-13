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

//select count(*), TO_CHAR(errorlog_date, 'YYYY-MM-DD') AS LOL FROM errorlog_table 
// where 1=1
// and errorlog_date >= sysdate-10
// group by TO_CHAR(errorlog_date,'YYYY-MM-DD')
// ORDER BY LOL;
router.get("/errorlogcount", function (req, res) {

    const qry = 
    "SELECT COUNT(*),TO_CHAR(ERRORLOG_DATE,'YYYY-MM-DD') AS LOL FROM ERRORLOG_TABLE  \
    WHERE 1=1 AND ERRORLOG_DATE >= SYSDATE-11  \
    GROUP BY TO_CHAR(ERRORLOG_DATE,'YYYY-MM-DD') \
    ORDER BY LOL"

    conn.execute(qry, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result.rows)
        res.json({
            errorA: result.rows[0][0],
            errorB: result.rows[1][0],
            errorC: result.rows[2][0],
            errorD: result.rows[3][0],
            errorE: result.rows[4][0],
            errorF: result.rows[5][0],
            errorG: result.rows[6][0],
            errorH: result.rows[7][0],
            errorI: result.rows[8][0],
            errorJ: result.rows[9][0],
            errorK: result.rows[10][0]
        })
    })
});

module.exports = router;