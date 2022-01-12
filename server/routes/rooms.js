const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const saltRounds = 10
oracledb.autoCommit = true;

//방목록 불러오기
function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}


router.post("/roomlist_2", (req, res) => {
    const selectarray = [req.body.user_seq,];
    oracledb.getConnection(dbConfig, (err, conn) => {
        todoWork(err, conn);
    });
        function todoWork(err, connection) {
            if (err) {
                console.error(err.message);
                console.log("데이터 가져오기 실패");
                return;
            }
            //{outFormat:oracledb.OBJECT} => 칼럼명을 오프잭트마다 제이슨 형식으로 이름 부여해주기
            // 참고링크 https://gaemi606.tistory.com/entry/Nodejs-Oracle-%EC%97%B0%EB%8F%99-npm-oracledb
            // 참고링크 오라클 공식문서 http://oracle.github.io/node-oracledb/doc/api.html
            connection.execute("SELECT ROOM_ID,USER_SEQ,ROOM_NAME,TO_CHAR(ROOM_DATE + 9/24, 'YYYY/MM/DD  DAY HH24:MI:SS')AS ROOM_DATE FROM ROOM_TABLE WHERE USER_SEQ=:user_seq ORDER BY ROOM_DATE DESC", selectarray, {outFormat:oracledb.OBJECT}, function (err, result) {
            console.log("result.rows[0].ROOM_DATE ::: "+result.rows[0].ROOM_DATE)    
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                res.send(result);
                console.log("resul 89 line"+result.rows[0].ROOM_DATE)
                doRelease(connection);
            });
    }
});

router.post("/roomjoinlist_2", (req, res) => {
    const selectarray = [req.body.user_seq,];
    oracledb.getConnection(dbConfig, (err, conn) => {
        todoWork(err, conn);
    });
        function todoWork(err, connection) {
            if (err) {
                console.error(err.message);
                console.log("데이터 가져오기 실패");
                return;
            }
            //{outFormat:oracledb.OBJECT} => 칼럼명을 오프잭트마다 제이슨 형식으로 이름 부여해주기
            // 참고링크 https://gaemi606.tistory.com/entry/Nodejs-Oracle-%EC%97%B0%EB%8F%99-npm-oracledb
            // 참고링크 오라클 공식문서 http://oracle.github.io/node-oracledb/doc/api.html
            connection.execute("SELECT ROOMJOIN_SEQ,USER_SEQ,ROOM_ID,ROOM_NAME,ROOMJOIN_DATE FROM ROOMJOIN_TABLE WHERE USER_SEQ=:user_seq ORDER BY ROOMJOIN_DATE DESC", selectarray,{outFormat:oracledb.OBJECT}, function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                res.send(result);
                doRelease(connection);
            });
    }
});


//방만들기
router.post("/roomcreate_2", (req, res) => {
    const insertarray = [req.body.room_id, req.body.room_name, req.body.room_password]
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
            connection.execute("insert into room_table (ROOM_ID,USER_SEQ,ROOM_NAME,ROOM_DATE) values(:room_id,9,:room_name,SYSDATE)", insertarray, function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                res.send(result);
                doRelease(connection);
            });
    }
});

//express에서 react로 데이터 보내기
// index.js 에서 use.app에 경로를 (api/data2)찍어준 것이 api는 setupProxy.js에서 localhost:5000으로 할당 -> localgost:5000/data2
router.post("/roomjoinname_2", (req, res) => {
    oracledb.getConnection(dbConfig, (err, conn) => {
        todoWork(err, conn);
    });
        function todoWork(err, connection) {
            if (err) {
                console.error(err.message);
                console.log("데이터 가져오기 실패");
                return;
            }
            connection.execute("select room_name from room_table ORDER BY room_date", [], function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                res.send(result.rows);
                console.log("result.rows"+result.rows);
                doRelease(connection);
            });
    }
});

//테이블 ID,PASSWORD로 방 존재확인
router.post("/roomjoinsearch_2", (req, res) => {
    const selectarray = [req.body.room_id, parseInt(req.body.room_password)]
    oracledb.getConnection(dbConfig, (err, conn) => {
        roomNamesearch(err, conn);
    });
        function roomNamesearch(err, connection) {
            if (err) {
                console.error(err.message);
                console.log("데이터 가져오기 실패");
                return;
            }
            connection.execute("select ROOM_NAME from ROOM_TABLE WHERE room_id =:room_id", selectarray, function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                res.send(result);
                doRelease(connection);
            });
    }
});


router.post("/roomleave_2", (req, res) => {
    console.log("req.body.user_seq"+req.body.user_seq)
    console.log("req.body.roomId"+req.body.roomId)
    const roomId=req.body.roomId
    const user_seq=req.body.user_seq
    const insertarray = [roomId]
    const insertarray2 = [roomId,user_seq]
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
            connection.execute("UPDATE ROOM_TABLE SET LEAVEROOM_DATE = SYSDATE WHERE room_id=:roomId", insertarray, function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
            connection.execute("UPDATE TIMEUSE_TABLE SET ROOMLEAVE_DATE = SYSDATE WHERE room_id=:roomId AND user_seq=:user_seq", insertarray2, function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
            });
                doRelease(connection);
            });
    }
});

router.post("/roomjoinleave_2", (req, res) => {
    console.log("req.body.user_seq"+req.body.user_seq)
    console.log("req.body.roomId"+req.body.roomId)
    const roomId=req.body.roomId
    const user_seq=req.body.user_seq
    const insertarray = [roomId,user_seq]
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
            connection.execute("UPDATE TIMEUSE_TABLE SET ROOMLEAVE_DATE = SYSDATE WHERE room_id=:roomId AND user_seq=:user_seq", insertarray, function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
            });
                doRelease(connection);
    }
});


module.exports = router