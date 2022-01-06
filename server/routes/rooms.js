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
// router.post("/roomcreatedata_test", (req, res) => {
//     const insertarray = [req.body.room_name]
//     //테이블에 방 이름 방 비밀번호 입력 
//     oracledb.getConnection(dbConfig, (err, conn) => {
//         roomNameInsert(err, conn);
//     });
//         function roomNameInsert(err, connection) {
//             if (err) {
//                 console.error(err.message);
//                 console.log("데이터 가져오기 실패");
//                 return;
//             }
//             connection.execute("insert into room_table (ROOM_SEQ,ROOM_ID,USER_ID,ROOM_NAME,ROOM_DATE) values(ROOM_SEQ.NEXTVAL,:room_id,9,:room_name,SYSDATE)", insertarray, function (err, result) {
//                 if (err) {
//                     console.error(err.message);
//                     doRelease(connection);
//                     return;
//                 }
//                 res.send(result);
//                 doRelease(connection);
//             });
//     }
// });


// router.post("/roomjoindata_test", (req, res) => {
//     const insertarray = [req.body.room_id, req.body.room_name]
//     //테이블에 방 이름 방 비밀번호 입력 
//     oracledb.getConnection(dbConfig, (err, conn) => {
//         roomNameInsert(err, conn);
//     });
//         function roomNameInsert(err, connection) {
//             if (err) {
//                 console.error(err.message);
//                 console.log("데이터 가져오기 실패");
//                 return;
//             }
//             connection.execute("insert into room_table (ROOM_SEQ,ROOM_ID,USER_ID,ROOM_NAME,ROOM_DATE) values(ROOM_SEQ.NEXTVAL,:room_id,9,:room_name,SYSDATE)", insertarray, function (err, result) {
//                 if (err) {
//                     console.error(err.message);
//                     doRelease(connection);
//                     return;
//                 }
//                 res.send(result);
//                 doRelease(connection);
//             });
//     }
// });



router.post("/roomlist_2", (req, res) => {
    const selectarray = [req.body.user_id,];
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
            connection.execute("SELECT ROOM_ID,ROOM_NAME,ROOM_PASSWORD,ROOM_DATE FROM ROOM_TABLE WHERE USER_ID=:user_id", selectarray,{outFormat:oracledb.OBJECT}, function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                res.send(result);
                //console.log("result.rows.room_id"+result.rows[0].ROOM_NAME)
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
            connection.execute("insert into room_table (ROOM_SEQ,ROOM_ID,USER_ID,ROOM_NAME,ROOM_PASSWORD,ROOM_DATE) values(ROOM_SEQ.NEXTVAL,:room_id,9,:room_name,:room_password,SYSDATE)", insertarray, function (err, result) {
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
            connection.execute("select room_name from room_table ORDER BY room_seq", [], function (err, result) {
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
            connection.execute("select ROOM_NAME from ROOM_TABLE WHERE room_id =:room_id and ROOM_PASSWORD =:room_password", selectarray, function (err, result) {
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

module.exports = router