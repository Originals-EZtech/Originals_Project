const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');
const mailConfig = require('../config/mailConfig');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const saltRounds = 10
oracledb.autoCommit = true;
const nodemailer = require('nodemailer');




router.post('/emailauth', (req, res) => {
    const userEmail = [req.body.email];
    console.log("서버에 건내받은 이메일: ", userEmail)

    conn.execute('select EMAIL from users where EMAIL = :email ', userEmail, function (err, result) {
        if (err) {
            console.log("select err", err)
        }
        const a = result.rows == 0 ? true : false;

        // 아이디가 이미 존재한다면
        if (result.rows != 0) {
            console.log("이메일 인증 select query 실패");
            return res.status(200).json({
                sendCodeSuccess: false, msg: userEmail+"은 이미 회원가입 되어있습니다."
            })
        }

        // 아이디가 없다면 진행 
        let authNum = Math.random().toString().substring(2, 6);
        let emailTemplete;
        ejs.renderFile('./server/emailAuth.ejs', { authCode: authNum }, function (err, data) {
            if (err) {
                console.log(err)
            }
            emailTemplete = data;
        });

        const smtpTransport = nodemailer.createTransport({
            service: "GMail",
            auth: {
                user: mailConfig.user,
                pass: mailConfig.pass
            }
        })

        var mailOptions = {
            from: "testeryuja@gmail.com",
            to: userEmail,
            subject: "Originals 회원가입 코드",
            html: emailTemplete
        };

        smtpTransport.sendMail(mailOptions, (error, result) => {

            if (error) {
                res.json({ msg: 'err' });
            } else {
                res.status(200).json({
                    sendCodeSuccess: true, authNum: authNum
                })
            }
            console.log("nodemailer종료");
            smtpTransport.close();
        });
    });
});


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

// SELECT query users
router.get("/list", function (req, res) {

    conn.execute("select * from users", function (err, result, fields) {
        if (err) {
            console.log("조회 실패");
        }
        console.log(result);
        console.log(result.rows);
        console.log("조회 성공");
        res.send(result.rows)
    }
    )
});

// signup
router.post("/register", function (req, res) {
    const param = [req.body.email, req.body.password]
    console.log("req: ", req.body)
    bcrypt.hash(param[1], saltRounds, (err, hash) => {
        param[1] = hash

        conn.execute('insert into users (EMAIL, PASSWORD) values(:email,:password)', param, function (err, result, fields) {
            if (err) {
                console.log("insert 실패");
            } else{
            res.status(200).json({
                success: true
            })
        }
            // console.log(result.rowsAffected);
            console.log("insert 성공");
        })
    })
});

//siginin
router.post("/login", function (req, res) {
    const userEmail = [req.body.email]
    const userPassword = req.body.password
    console.log("req: ", req.body)
    console.log("reqemail: ", req.body.email)
    console.log("reqpassword: ", req.body.password)

    conn.execute('select EMAIL, PASSWORD from users where EMAIL = :email ', userEmail, function (err, result) {
        if (err) console.log("select err", err)
        // 아이디가 존재하지 않다면
        if (result.rows == 0) {
            console.log("select id 실패");
            res.send("아이디 없음");
            return;
        }
        // 아이디가 존재한다면
        console.log("result.rows[0][1]", result.rows[0][1]);
        console.log(userPassword);
        bcrypt.compare(userPassword, result.rows[0][1], (err, resultt) => {
            // console.log("req.body.pw: ",req.body.pw);
            // console.log("result.rows[0][1]: ",result.rows[0][1]);
            // console.log(typeof(resultt))
            if (resultt) {
                console.log(resultt)
                // res.send("비번 일치o")
                // res.send(result.rows[0]);
                res.status(200).json({
                    loginSuccess: true
                })
                console.log("비밀번호 일치");
            } else {
                console.log(resultt)
                console.log("비밀번호가 틀렸습니다.")
                res.send("비밀번호가 틀렸습니다.")
            }
        })
    })
});





module.exports = router;