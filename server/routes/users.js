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


/**
 * 이메일인증
 * 클라이언트에서 회원 이메일을 받아 db에확인후 없다면 인증코드 발송
 * 랜덤 4자리 숫자로 인증코드 발송
 * 클라이언트에 상태값으로 저장후 
 * 유저가 적은 인증코드와 일치하는지 확인
 * emailAuth.ejs는 이메일 형식 
 */
router.post('/emailauth', (req, res) => {
    const userEmail = [req.body.email];
    console.log("서버에 건내받은 이메일: ", userEmail)

    conn.execute('select USER_EMAIL from USER_TABLE where USER_EMAIL = :email ', userEmail, function (err, result) {
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

        // 이메일 옵션
        var mailOptions = {
            from: "testeryuja@gmail.com",
            to: userEmail,
            subject: "Originals 회원가입 코드",
            html: emailTemplete
        };

        //이메일 전송 파트
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
    conn.execute("select * from user_table", [], { outFormat: oracledb.OBJECT }, function (err, result, fields) {
        if (err) {
            console.log("조회 실패");
        }
        console.log("result:", result);

        res.send(result)
    })
});

// SELECT query all attachment
router.get("/userList", function (req, res) {
    conn.execute("select * from attachment_table", [], { outFormat: oracledb.OBJECT }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            // console.log('query result', result);
            res.send(result.rows);
        }
    })
})


/**
 * 이미 받아온 email이 DB에 존재여부를 알려주고
 * 없다면 
 * 패스워드 암호화후
 * 디비에 저장
 * 동시에 연관관계 토큰테이블에 해당 유저 email로 컬럼추가
 */
router.post("/register", function (req, res) {
    //클라이언트에서 받아온 정보
    const param = [req.body.email, req.body.password, req.body.name, req.body.role, req.body.flag]
    console.log("req: ", req.body)
    if (param.email === '' || param.password === '' || param.name) {
        res.status(200).json({
            success: false
        })
    } else {
        //패스워드 디비에 가기전 암호화 파트
        bcrypt.hash(param[1], saltRounds, (err, hash) => {
            param[1] = hash

            conn.execute('INSERT INTO USER_TABLE (USER_SEQ, USER_EMAIL, USER_PASSWORD, USER_NAME, USER_ROLE, USER_FLAG) VALUES(user_seq.NEXTVAL, :email, :password, :name, :role, :flag)', param, function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(200).json({
                        success: false, msg: "회원가입 실패하셨습니다."
                    })
                    // 토큰 칼럼생성 파트
                } else {
                    conn.execute('INSERT INTO TOKEN_TABLE (TOKEN_SEQ, USER_EMAIL) VALUES(token_seq.NEXTVAL,:user_email)', [req.body.email], function (err2, result2) {
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
const upload = multer({ dest: './upload' });

router.post('/imgUpload', upload.single('image'), (req, res) => {
    console.log(req.file);
    let email = req.body.email;
    let image = '/api/image/' + req.file.filename;
    const param = [email, image];
    // console.log('image', image);
    // console.log('email', email);

    conn.execute('insert into attachment_table (USER_EMAIL, DIRECTORY) values(:email, :dir)', param, function (err, result) {
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

/**
 * 로그인시 클라이언트에서 받아온 이메일로 DB에 존재확인
 * 존재한다면 클라이언트에서 받아온 패스워드를 bcrypt에 있는 compare 함수로 
 * 다시 암호화해 DB에 저장된 패스워드와 비교
 * 일치한다면
 * access와 refresh 토큰을 발급
 * access token에는 payload에 user의 pk값 (우리는 user_email)을 넣고 
 * 서버에 저장된 key로 토큰 생성
 * refresh token은 서버에 저장된 key로만 토큰생성
 * 이후 해당  user_table의 fk값을 찾아 refresh token을 DB에 저장
 * 두개의 토큰을 쿠키에 각각 유저의 브라우저에 뿌려줌
 * 
 * ---------------------------------------------------------------
 * 
 * 두개의 token이 돌아가는 방식
 * access는 refresh 비해 짧은 유효시간을 가져
 * 계속해서 refresh에 의존해 이후 검증 파트에서 재발급 받는 구조
 */
router.post("/login", function (req, res) {
    const userEmail = req.body.email
    const userPassword = req.body.password
    console.log(req.body.email, req.body.password)
    if (userEmail === '' || userPassword === '') {
        res.status(200).json({
            loginSuccess: false, msg: "이메일 또는 비밀번호 기입해주세요."
        })
    }

    conn.execute('select USER_EMAIL, USER_PASSWORD, USER_NAME, USER_ROLE, USER_SEQ, USER_FLAG from USER_TABLE where USER_EMAIL = :email ', [userEmail], function (err, result) {
        if (err) console.log("select err", err)
        // 아이디가 존재하지 않다면
        if (result.rows == 0) {
            res.status(200).json({
                loginSuccess: false, msg: userEmail + "는 등록되지않은 이메일입니다."
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
                    conn.execute('update TOKEN_TABLE set TOKEN_VALUE = :token_value where USER_EMAIL = :user_email ', completedToken, function (err2, result2) {
                        if (err2) {
                            console.log(err2)
                            console.log("refresh토큰 insert 실패");
                        } else {
                            res.cookie("refreshToken", refreshToken)
                                .cookie("accessToken", accessToken)
                                .cookie("user_name", result.rows[0][2])
                                .cookie("user_email", result.rows[0][0])
                                .cookie("user_role", result.rows[0][3])
                                .cookie("user_seq", result.rows[0][4])
                                .cookie("user_flag", result.rows[0][5])
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


/**
 * 토큰으로 검증시 
 * access가 만료되었다면
 * refresh를 통해 DB에 접근해 해당유저의 email을 가져와
 * new access 발급
 * refresh가 만료되었다면
 * access를 복화시켜
 * new refresh 발급후 DB에 저장
 */
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
            conn.execute('select user_email from TOKEN_TABLE where TOKEN_VALUE = :token_value', [refresh], function (err4, result) {
                if (err4) {
                    console.log(err4)
                } else {
                    let newAccessToken = jwt.sign({ email: result.rows[0][0] }, tokenConfig.secretKey, { expiresIn: "2h", issuer: "Originals-Team" });
                    res.cookie("accessToken", newAccessToken)
                        .json({ isAuth: true })
                }
            })
        }
    } else {
        // access === 존재
        if (refresh === undefined) {
            console.log("도착?")
            let verifyAccess = jwt.verify(access, tokenConfig.secretKey);
            const test = verifyAccess.email
            let newRefreshToken = jwt.sign({}, tokenConfig.secretKey, { expiresIn: "14d", issuer: "Originals-Team" });
            conn.execute('update TOKEN_TABLE set TOKEN_VALUE = :token_value where USER_EMAIL = :user_email ', [newRefreshToken, test], function (err2, result2) {
                if (err2) { console.log(err2) }
                res.cookie("refreshToken", newRefreshToken)
                    .json({ isAuth: true })
            })
        }
    }
    if (!access === null) {
        let verify = jwt.verify(access, tokenConfig.secretKey);
        const email_user = verify.email
        conn.execute('SELECT USER_ROLE FROM USER_TABLE WHERE USER_EMAIL = :email', [email_user], function (err5, result5) {
            if (err5) {
                console.log(err5)
            } if (result5.rows[0][0] === 'admin') {
                res.json({ isAuth: true, isAdmin: true })
                console.log("토큰인증끝")
            } else {
                res.json({ isAuth: true, isAdmin: false })
                console.log("토큰인증끝")
            }
        })
    }
})


/**
 * 로그아웃시 
 * 토큰을 복호화시켜 해당 유저의 token_table의 token 저장값을 비워줌
 * refresh token 제외하고 clear
 */
router.get('/logout', function (req, res) {
    const access = req.cookies.accessToken

    jwt.verify(access, tokenConfig.secretKey, function (err, decoded) {
        conn.execute('update TOKEN_TABLE set TOKEN_VALUE = null where USER_EMAIL = :user_email ', [decoded.email], function (err2, result2) {
            if (err) { console.log(err) }
            res.clearCookie("accessToken")
            res.clearCookie("refreshToken")
            res.clearCookie("user_name")
            res.clearCookie("user_email")
            res.clearCookie("user_role")
                .status(200).json({
                    logoutSuccess: true,
                    msg: "로그아웃 되셨습니다."
                })
        })
        console.log("Cookie cleared");
    })

})


module.exports = router;