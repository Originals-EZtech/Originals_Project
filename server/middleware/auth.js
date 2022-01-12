const express = require('express');
const router = express.Router();
const dbConfig = require('../config/dbConfig');
const tokenConfig = require('../config/tokenConfig');
var jwt = require('jsonwebtoken');
const oracledb = require('oracledb');
oracledb.autoCommit = true;

var conn;
oracledb.getConnection(dbConfig, function (err, con) {
    if (err) {
        console.log(err);
        return;
    }
    conn = con;
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
            let verifyAccess = jwt.verify(access, tokenConfig.secretKey);
            const test = verifyAccess.email
            let newRefreshToken = jwt.sign({}, tokenConfig.secretKey, { expiresIn: "14d", issuer: "Originals-Team" });
            conn.execute('update TOKEN_TABLE set TOKEN_VALUE = :token_value where USER_EMAIL = :user_email ', [newRefreshToken, test], function (err2, result2) {
                if (err2) { console.log(err2) }
                res.cookie("refreshToken", newRefreshToken)
                    .json({ isAuth: true })
            })
        } else {
            let verify = jwt.verify(access, tokenConfig.secretKey);
            const email_user = verify.email
            conn.execute('SELECT USER_ROLE FROM USER_TABLE WHERE USER_EMAIL = :email', [email_user], function (err5, result5) {
                if (err5) {
                    console.log(err5)
                } if (result5.rows[0][0] === 'admin') {
                    res.json({ isAuth: true, isAdmin: true })
                } else {
                    res.json({ isAuth: true, isAdmin: false })
                }
            })
        }
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
            res.clearCookie("user_seq")
            res.clearCookie("user_flag")
                .status(200).json({
                    logoutSuccess: true,
                    msg: "로그아웃 되셨습니다."
                })
        })
        console.log("Cookie cleared");
    })
})

module.exports = router;