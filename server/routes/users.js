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
require('dotenv').config();
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

router.get('/dotenv', function(req, res){
    res.send(process.env.TEST);
    console.log(process.env.TEST)
})
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
    conn.execute("select * from users",[],{outFormat:oracledb.OBJECT}, function (err, result, fields) {
        if (err) {
            console.log("조회 실패");
        }
        console.log("result:",result);
        // console.log("result:",result.rows);

        // console.log("metadata:",result.metaData[0].name);
        // console.log("rows:",JSON.parse(result.rows[0]));
        // const reeee = JSON.parse(result.rows[0][0]);
        // console.log("reeee",reeee);
        // var otherArray = [result.metaData[0].name, result.metaData[1].name];
        // var otherObject = { email: result.rows[0], item2: "item2val" };
        // console.log("otherArray:",otherArray);
        // console.log("otherObject:",otherObject);
        // var json = JSON.stringify({
        //   anObject: otherObject,
        //   anArray: otherArray,
        //   another: "item"
        // });
//         select department "department",
//   ufh "ufh",
//   libelle "libelle",
//   nomhopital "nomhopital",
//   typeservice "typeservice"
// from Z_SOUPAP2CARTESITE 
// where actif=1 
        res.send(result)
    })
});

// SELECT query all attachment
router.get("/userList", function (req, res) {
    conn.execute("select * from attachment", [], {outFormat: oracledb.OBJECT}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('query result', result);
            res.send(result.rows);
        }
    })
})


// signup
router.post("/register", function (req, res) {
    const param = [req.body.email, req.body.password, req.body.name, req.body.role, req.body.flag]
    console.log("req: ", req.body)
    if (param.email === '' || param.password === '' || param.name) {
        res.status(200).json({
            success: false
        })
    } else {
        bcrypt.hash(param[1], saltRounds, (err, hash) => {
            param[1] = hash

            conn.execute('insert into users (EMAIL, PASSWORD, NAME, ROLE, FLAG) values(:email,:password,:name,:role,:flag)', param, function (err, result) {
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

// register시 Teacher인 경우 파일 업로드

// multer 라이브러리로 인해 업로드되는 파일의 이름이 중복되지 않게 랜덤으로 생성되어 저장
const multer = require('multer');
const upload = multer({dest: './upload'});

router.post('/imgUpload', upload.single('image'), (req, res) => {
    console.log(req.file);
    let email = req.body.email;
    let image = '/api/image/' + req.file.filename;
    const param = [email, image];
    // console.log('image', image);
    // console.log('email', email);

    conn.execute('insert into attachment (USER_EMAIL, DIRECTORY) values(:email, :dir)', param, function (err, result) {
        if (err) {
            console.log(err);
            res.status(200).json({
                uploadSuccess: false, msg: "파일 업로드가 실패했습니다."
            })
        } else {
            res.status(200).json({
                uploadSuccess: true, msg: "파일 업로드 성공"
            })
        }
    })
})

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
                    var refreshToken = jwt.sign({}, tokenConfig.secretKey, { expiresIn: "2h", issuer: "Originals-Team" });
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


    console.log(" refresh 값은? ", refresh)
    console.log(" access 값은?  ", access)
    // access 만료됬다면
    if (access === undefined) {
        // refresh 까지 만료됬다면 
        if (refresh === undefined) {
            return res.json({ isAuth: false, err: true });
        } else {
            conn.execute('select user_email from TOKENS where TOKEN = :token', [refresh], function (err4, result) {
                if (err4) { console.log(err4) }
                let newAccessToken = jwt.sign({ email: result.rows[0][0] }, tokenConfig.secretKey, { expiresIn: "2h", issuer: "Originals-Team" });
                console.log(newAccessToken)
                res.cookie("accessToken", newAccessToken)
                    .json({ isAuth: true })
            })
        }
    } else {
        // access === 존재
        if (refresh === undefined) {
            console.log("도착?")
            let verifyAccess = jwt.verify(access, tokenConfig.secretKey);
            const test = verifyAccess.email
            let newRefreshToken = jwt.sign({}, tokenConfig.secretKey, { expiresIn: "14d", issuer: "Originals-Team" });
            conn.execute('update tokens set TOKEN = :token where USER_EMAIL = :user_email ', [newRefreshToken, test], function (err2, result2) {
                if (err2) { console.log(err2) }
                res.cookie("refreshToken", newRefreshToken)
                    .json({ isAuth: true })
            })
        }
    }
    console.log("토큰인증끝")
})


// logout
router.get('/logout', function (req, res) {
    const access = req.cookies.accessToken

    jwt.verify(access, tokenConfig.secretKey, function (err, decoded) {
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