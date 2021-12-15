const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const saltRounds = 10
oracledb.autoCommit = true;


router.post("/roomcreate", (req, res) => {
    const room_name = req.body.room_name;
    const room_password = req.body.room_password;
    console.log("typeofroom_name ="+ typeof(room_name));
    console.log("req.body ="+req.body);
    console.log("room_name ="+room_name);
    console.log("room_password ="+room_password);
    const insertarray = [req.body.room_name, req.body.room_password]

    //테이블에 방 이름 방 비밀번호 입력 
    oracledb.getConnection(dbConfig, (err, conn) => {
        roomNameInsert(err, conn);
    });
        function roomNameInsert(err, connection) {
            if (err) {
                console.error(err.message);
                console.log("데이터 가져오기 실패");
                return;
            }
            connection.execute("insert into room_table (ROOM_ID,USER_ID,ROOM_NAME,ROOM_PASSWORD,ROOM_DATE) values(ROOM_SEQ.NEXTVAL,9,:room_name,:room_password,SYSDATE)", insertarray, function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                res.send(result);
                doRelease(connection);
            });
        function doRelease(connection) {
            connection.release(function (err) {
                if (err) {
                    console.error(err.message);
        
                }
            });
        }
    }
});


    //express에서 react로 데이터 보내기

// index.js 에서 use.app에 경로를 (api/data2)찍어준 것이 api는 setupProxy.js에서 localhost:5000으로 할당 -> localgost:5000/data2
router.post("/roomjoin", (req, res) => {
    console.log("1");
    oracledb.getConnection(dbConfig, (err, conn) => {
        todoWork(err, conn);
    });
        function todoWork(err, connection) {
            if (err) {
                console.error(err.message);
                console.log("데이터 가져오기 실패");
                return;
            }
            connection.execute("select room_name from room_table", [], function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                console.log("rows=" + result.rows);
                console.log("typeof(rows) =" + typeof(result.rows));
                console.log("rows[0]=" + result.rows[0]);
                res.send(result.rows);
                doRelease(connection);
            });
        function doRelease(connection) {
            connection.release(function (err) {
                if (err) {
                    console.error(err.message);
        
                }
            });
        }
    }
});


module.exports = router