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

//email auth
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
                res.json({ msg: '이메일 주소를 확인해주세요' });
            } else {
                console.log("발급한 보안코드 ", authNum);
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

            conn.execute('insert into users (EMAIL, PASSWORD, NAME) values(:email,:password,:name)', param, function (err, result) {
                if (err) {
                    res.status(200).json({
                        success: false, msg: "회원가입 실패하셨습니다."
                    })
                    // 토큰 칼럼생성
                } else {
                    conn.execute('insert into tokens (ID, USER_EMAIL) values(tmp_seq.NEXTVAL,:user_email)', [req.body.email], function (err2, result2) {
                        if (err2) console.log(err2)
                    })
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
    const userEmail = req.body.email
    const userPassword = req.body.password
    console.log(req.body.email, req.body.password)
    if (userEmail === '' || userPassword === '') {
        res.status(200).json({
            loginSuccess: false, msg: "이메일 또는 비밀번호 기입해주세요."
        })
    }
    conn.execute('select EMAIL, PASSWORD, NAME from users where EMAIL = :email ', [userEmail], function (err, result) {
        if (err) console.log("select err", err)
        // 아이디가 존재하지 않다면
        if (result.rows == 0) {
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
                    var refreshToken = jwt.sign({ email: userEmail }, tokenConfig.secretKey, { expiresIn: "2h", issuer: "Originals-Team" });
                    var accessToken = jwt.sign({ email: userEmail }, tokenConfig.secretKey, { expiresIn: "14d", issuer: "Originals-Team" });
                    const completedToken = [refreshToken, userEmail]
                    console.log("배열에 넣은 토큰정보:", completedToken)
                    conn.execute('update tokens set TOKEN = :token where USER_EMAIL = :user_email ', completedToken, function (err2, result2) {
                        if (err2) {
                            console.log(err2)
                            console.log("refresh토큰 insert 실패");
                        } else {
                            res.cookie("refreshToken", refreshToken)
                                .cookie("accessToken", accessToken)
                                .cookie("user_info", result.rows[0][2])
                                .status(200)
                                .json({ loginSuccess: true, email: userEmail, name: result.rows[0][2], msg: userEmail + " 로그인 성공" })
                        }
                    })
                    // 비번일치안한다면
                } else {
                    res.status(200).json({
                        loginSuccess: false, msg: userEmail + " 비밀번호가 틀렸습니다."
                    })
                }
            })
        }
    })
});

// auth
router.get('/auth', function (req, res) {
    // 쿠키에 있는 token 정보
    let refresh = req.cookies.refreshToken;
    let access = req.cookies.accessToken;
    jwt.verify(refresh, tokenConfig.secretKey, function (err, decoded) {
        conn.execute('select user_email from TOKENS where TOKEN = :token', [refresh], function (err, result) {
            if (err) { console.log(err) }
            if (!decoded) {
                return res.json({ isAuth: false, err: true })
            } else {
                // access 만료됬다면
                if (access === null) {
                    // refresh 까지 만료됬다면 
                    if (refresh === undefined) {
                        throw Error('API 사용 권한이 없습니다.');
                    } else {
                        const newAccessToken = jwt.sign({ email: userEmail }, tokenConfig.secretKey, { expiresIn: "2h", issuer: "Originals-Team" });
                        res.cookie("accessToken", newAccessToken);
                    }
                } else {
                    // access는 유효하지만
                    if (refresh === undefined) {
                        const newRefreshToken = jwt.sign({ email: userEmail }, tokenConfig.secretKey, { expiresIn: "14d", issuer: "Originals-Team" });
                        res.cookie("refreshToken", newRefreshToken);
                    }
                }
                console.log( "토큰인증확인")
                req.email = decoded.email
                req.iat = decoded.iat
                req.exp = (decoded.exp - decoded.iat) / 60 + "분"
                req.issuer = decoded.iss
                res.status(200).json({
                    isAuth: true,
                    email: req.email,
                    iat: req.iat,
                    exp: req.exp,
                    issuer: req.issuer
                })
            }
        })
    })
})

// logout
router.get('/logout', function (req, res) {
    const refresh = req.cookies.refreshToken

    jwt.verify(refresh, tokenConfig.secretKey, function (err, decoded) {
        conn.execute('update tokens set TOKEN = null where USER_EMAIL = :user_email ', [decoded.email], function (err2, result2) {
            if (err) { console.log(err) }
            res.clearCookie("accessToken")
            res.clearCookie("user_info")
                .status(200).json({
                    logoutSuccess: true,
                    msg: "로그아웃 되셨습니다."
                })
        })
        console.log("Cookie cleared");
    })

})


module.exports = router;