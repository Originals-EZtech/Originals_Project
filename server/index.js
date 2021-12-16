const express = require('express');
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/data2', require('./routes/rooms'));
app.use('/api/mail', require('./routes/mailtest'));
/* 12/15 작업중-------------------------------------

// const session =require('express-session')
// const cookieParser = require('cookie-parser')

// app.use(cookieParser());
// app.use(
//     session({
//         key:"loginData",
//         secret: "testSecret",
//         resave: false,
//         saveUninitialized :false,
//         cookie:{
//             expires: 60 * 60 
//         }
//     })
// )


DB 설정
const oracledb = require('oracledb');
const dbConfig = require('./config/dbConfig');
const mybatisConfig = require('./config/mybatisConfig')
oracledb.autoCommit = true;

mybatis-mapper 추가
const mybatisMapper = require('mybatis-mapper');

Mapper Load
mybatisMapper.createMapper([mybatisConfig.mybatisURL]);
console.log([mybatisConfig.mybatisURL]);
var conn;
oracledb.getConnection(dbConfig, function (err, con) {
    if(err){
        console.log('접속 실패', err);
        return;
    }
    conn = con;
    console.log('접속 성공');
});


app.get("/api/list",function(req,res){
    
    conn.execute("select * from test", function(err,result, fields){
        //field는 칼럼
        if(err){
            console.log("조회 실패");
        }
        console.log(result.rows);
        console.log("조회 성공");
        
    }
    )});
    
    */

// app.get('/', (req, res) => res.send('Hello World ~~~~~ HIHI'));

app.get('/api/hello', (req, res) => {
    oracledb.getConnection(dbConfig, (err, conn) => {
        todoWork(err, conn);
    });

    function todoWork(err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }

        let format = { language: 'sql', indent: ' ' };
        let query = mybatisMapper.getStatement('oracleMapper', 'selectUserInfo', null, format)

        connection.execute(query, function (err, result) {
            if (err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);  //데이터
            console.log('DB 연결 성공');

            res.send(result.rows);
            doRelease(connection, result.rows);
        });
    }

    // DB 연결 해제
    function doRelease(connection) {
        connection.release(function (err) {
            if (err) {
                console.error(err.message);

            }
        });
    } 
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`));