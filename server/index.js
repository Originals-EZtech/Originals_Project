const express = require('express');
const app = express();
const port = 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// DB 설정
const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');

oracledb.autoCommit = true;

// mybatis-mapper 추가
const mybatisMapper = require('mybatis-mapper');

// Mapper Load
// mybatisMapper.createMapper(['C:\Users\user\Originals-EZtech\Originals_Project\server\mybatis\oracle-mapper.xml']);





app.get('/', (req, res) => res.send('Hello World ~~~~~ HIHI'));

app.get('/api/hello', (req, res) => {
    oracledb.getConnection(dbConfig, (err, conn) => {
        todoWork(err, conn);
        console.log('visited~~~~~~~~~~~~~~~~~~~~~~~~')
    });
    
    function todoWork(err, connection) {
        console.log(1,"todoWorkdotdotdot"); 
        if (err) {
            console.error(err.message);
            return;
        }
    
        let format = {language: 'sql', indent: ' '};
        // let query = mybatisMapper.getStatement('oracleMapper', 'selectUserInfo', null, format)
    
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
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));