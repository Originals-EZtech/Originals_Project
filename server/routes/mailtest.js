const express = require('express');
const router = express.Router();
const mailConfig = require('../config/mailConfig');
const nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');




router.get('/jwt', function (req,res){
  var token = jwt.sign({ test:"test"},"secretKey",{
    subject: "token' sub",
    expiresIn: '60m',
    issuer:"hyun"
  });
  console.log("토큰생성 : ", token);
  res.send(token)
  try {
    var check = jwt.verify(token,"secretKey");
    if(check){
      console.log("검증",check.test);
    }

  } catch (e) {
    console.log(e);
  }

})

router.get('/send', async(req, res) => {
    const userEmail = req.body.email;

    const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
    }
  })

    const mailOptions = {
      from: "testeryuja@gmail.com",
      to: userEmail,
      subject: "Originals 회원가입 코드",
      text: "wassup"
    };
    console.log(userEmail);
    
    await smtpTransport.sendMail(mailOptions, (error, ress) =>{
        console.log(1,ress)
        console.log(res)
        console.log(2,ress)

        if(error){
            res.json({msg:'err'});
            console.log(1,"");
        }else{
            res.json({msg:'success'});
            console.log("else~~~~~~~~~~~~~~~~~~~~~~");
        }
        console.log(2,"nodemailer종료직전");
        smtpTransport.close();
    });
    console.log(2,"lasttttttttttttttttttt")

  });

  
  
module.exports = router;