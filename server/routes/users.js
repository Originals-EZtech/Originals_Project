const express = require('express');
const router = express.Router();
const dbConfig = require('../config/dbConfig');
const mailConfig = require('../config/mailConfig');
const tokenConfig = require('../config/tokenConfig');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const saltRounds = 10
const oracledb = require('oracledb');
const nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
oracledb.autoCommit = true;

//oracledb connection
var conn;
oracledb.getConnection(dbConfig, function (err, con) {
    if (err) {
        console.log('접속 실패', err);
        return;
    }
    conn = con;
    console.log('DB connection');
});


router.post('/emailauth', (req, res) => {
    const userEmail = [req.body.email];
    console.log("서버에 건내받은 이메일: ", userEmail)

    conn.execute('select EMAIL from users where EMAIL = :email ', userEmail, function (err, result) {
        if (err) {
            console.log("select error from emailauth", err)
        }

        // 아이디가 이미 존재한다면        
        if (result.rows != 0) {
            console.log("이메일 인증 select query 실패");
            return res.status(200).json({
                sendCodeSuccess: false, msg: userEmail + "은 이미 회원가입 되어있습니다."
            })
        }

        // 아이디가 없다면 진행 
        let authNum = Math.random().toString().substring(2, 6);
        let emailTemplete;
        ejs.renderFile('./server/emailAuth.ejs', { authCode: authNum }, function (err2, data) {
            if (err2) {
                console.log(err2)
            }
            emailTemplete = data;
        });

        const smtpTransport = nodemailer.createTransport({
            service: "GMail",
            auth: {
                user: mailConfig.user,
                pass: mailConfig.pass
            }
        });

        var mailOptions = {
            from: "testeryuja@gmail.com",
            to: userEmail,
            subject: "Originals 회원가입 코드",
            html: emailTemplete
        };
        smtpTransport.sendMail(mailOptions, (error, res23) => {
            console.log("nodemailer 발송");
            
            if (error) {
                console.log(error);
                res.json({ msg: '이메일 주소를 확인해주세요' });
            } else {
                console.log("발급한 보안코드 ",authNum);
                res.status(200).json({
                    sendCodeSuccess: true, authNum: authNum, msg: '인증 메일 발송 완료'
                })
            }
            console.log("nodemailer종료");
            smtpTransport.close();
        });
    });
});


// SELECT query all users
router.get("/list", function (req, res) {
    conn.execute("select * from users", function (err, result, fields) {
        if (err) {
            console.log("조회 실패");
        }
        console.log("조회 성공");
        res.send(result.rows)
    })
});


// signup
router.post("/register", function (req, res) {
    const param = [req.body.email, req.body.password, req.body.name]
    console.log("req: ", req.body)
    if (param.email === '' || param.password === '' || param.name) {
        res.status(200).json({
            success: false
        })
    } else {
        bcrypt.hash(param[1], saltRounds, (err, hash) => {
            param[1] = hash

            conn.execute('insert into users (EMAIL, PASSWORD, NAME) values(:email,:password,:name)', param, function (err, result, fields) {
                if (err) {
                    res.status(200).json({
                        success: false, msg: "회원가입 실패하셨습니다."
                    })
                    console.log("insert 실패");
                } else {
                    res.status(200).json({
                        success: true, msg: "회원가입 되셨습니다."
                    })
                }
                console.log("sign-up insert 성공");
            })
        })
    }
});


//siginin
router.post("/login", function (req, res) {
    const userEmail = [req.body.email]
    const userPassword = req.body.password
    console.log("클라에서 받은 아이디 비번: ",req.body.email, req.body.password)
    if (req.body.email === '' || req.body.password === '') {
        res.status(200).json({
            loginSuccess: false, msg: "이메일 또는 비밀번호 기입해주세요."
        })
    }
    conn.execute('select EMAIL, PASSWORD, NAME from users where EMAIL = :email ', userEmail, function (err, result) {
        if (err) console.log("select err", err)
        // 아이디가 존재하지 않다면
        if (result.rows == 0) {
            console.log("아이디 틀림")

            res.status(200).json({
                loginSuccess: false, msg: req.body.email + "는 등록되지않은 이메일입니다."
            })
        } else {
            // 아이디가 존재한다면
            bcrypt.compare(userPassword, result.rows[0][1], (error, resultt) => {
                if (error) {
                    console.log("bcrypt.compare", error)
                }
                // 비번 일치한다면 토큰 배급 시작
                if (resultt) {
                    var token = jwt.sign({email: req.body.email,name:result.rows[0][2] }, tokenConfig.secretKey,{ expiresIn: "2h",issuer:"Originals-Team"});
                    const completedToken = [token, req.body.email]
                    console.log("배열에 넣은 토큰정보:", completedToken)
                    conn.execute('update users set TOKEN = :token where EMAIL = :email ', completedToken, function (err2, result2) {
                        if (err2) {
                            console.log(err2)
                            console.log("토큰 insert 실패");
                        } else {
                            console.log("쿠키 및 토큰 발급", token);
                            res.cookie("x_auth", completedToken[0])
                                .cookie("user_info", result.rows[0][2])
                                .status(200)
                                .json({ loginSuccess: true, email: completedToken[1], name: result.rows[0][2], msg: req.body.email + " 로그인 성공" })
                        }
                    })
                    // 비번일치안한다면
                } else {
                    console.log("비밀번호 틀림")
                    res.status(200).json({
                        loginSuccess: false, msg: req.body.email + " 비밀번호가 틀렸습니다."
                    })
                }
            })
        }
    })
});

router.get('/auth', function (req, res) {
    // 쿠키에 있는 token 정보
    let token = req.cookies.x_auth;

    jwt.verify(token, tokenConfig.secretKey, function (err, decoded) {
        conn.execute('select TOKEN, EMAIL, NAME from users where TOKEN = :token', [token], function (err, result) {
            if(err)console.log(err)
            if(!decoded) return res.json({isAuth: false, err : true})
            console.log(decoded,"토큰인증확인")
            req.token = token
            req.email = decoded.email
            req.name = decoded.name
            req.iat = decoded.iat
            req.exp = (decoded.exp-decoded.iat)/60 +"분"
            req.issuer= decoded.iss
            res.status(200).json({
                isAuth: true,
                email: req.user,
                name: req.name,
                iat: req.iat,
                exp:req.exp,
                token:req.token,
                issuer: req.issuer
            })
        })
    })
})

router.get('/logout', function(req,res) {

    res.clearCookie("x_auth")
    res.clearCookie("user_info")
    .status(200).json({
        logoutSuccess: true,
        msg: "로그아웃 되셨습니다."
    })
    console.log("Cookie cleared");
}
)


module.exports = router;