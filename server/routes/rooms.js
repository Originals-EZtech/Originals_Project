const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const saltRounds = 10
oracledb.autoCommit = true;



//방만들기

router.post("/roomcreate", (req, res) => {
    const room_name = req.body.room_name;
    const room_password = req.body.room_password;
    console.log("typeofroom_name ="+ typeof(room_name));
    console.log("req.body ="+req.body);
    console.log("room_name ="+room_name);
    console.log("room_password ="+room_password);
    const insertarray = [req.body.room_name, req.body.room_password]
    console.log("insertarray ="+insertarray);
    console.log("insertarray[0] ="+insertarray[0]);
    console.log("typeofinsertarray[0] ="+typeof(insertarray[0]));
    console.log("insertarray ="+insertarray);
    console.log("insertarray ="+insertarray);

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
router.post("/roomjoinname", (req, res) => {
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
            connection.execute("select room_name from room_table ORDER BY room_id", [], function (err, result) {
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

//테이블 ID,PASSWORD로 방 존재확인
router.post("/roomjoinsearch", (req, res) => {
    const room_id = parseInt(req.body.room_id);
    const room_password = parseInt(req.body.room_password);
    console.log("typeofreq.body.room_id ="+ typeof(req.body.room_id));
    console.log("req.body.room_id ="+req.body.room_id);

    console.log("typeofroom_id ="+ typeof(room_id));
    console.log("req.body ="+req.body);
    console.log("room_id ="+room_id);
    console.log("typeof(room_id) ="+typeof(room_id));
    console.log("room_password ="+room_password);
    const testarray = [req.body.room_id, req.body.room_password]
    console.log("testarray ="+testarray);
    const selectarray = [parseInt(req.body.room_id), parseInt(req.body.room_password)]
    console.log("typeof(selectarray[0])"+typeof(selectarray[0]));
    //테이블에 방 이름 방 비밀번호 입력 
    oracledb.getConnection(dbConfig, (err, conn) => {
        roomNamesearch(err, conn);
    });
        function roomNamesearch(err, connection) {
            if (err) {
                console.error(err.message);
                console.log("데이터 가져오기 실패");
                return;
            }
            connection.execute("select ROOM_NAME from ROOM_TABLE WHERE room_id =:room_id and ROOM_PASSWORD =:room_password", selectarray, function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease2(connection);
                    return;
                }
                console.log("result.room_name"+result.room_name);
                console.log("result"+result);
                console.log("result.rows[0]"+result.rows[0]);
                res.send(result);
                doRelease2(connection);
            });
        function doRelease2(connection) {
            connection.release(function (err) {
                if (err) {
                    console.error(err.message);
        
                }
            });
        }
    }
});


module.exports = router