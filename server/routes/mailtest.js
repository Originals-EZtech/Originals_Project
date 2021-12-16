const express = require('express');
const router = express.Router();
const mailConfig = require('../config/mailConfig');
const nodemailer = require('nodemailer');

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