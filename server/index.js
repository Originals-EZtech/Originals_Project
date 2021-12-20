const express = require('express');
const app = express();
const port = 5000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/data2', require('./routes/rooms'));
app.use('/api/test', require('./routes/mailtest'));

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