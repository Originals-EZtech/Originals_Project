require('dotenv').config({ path : 
    "./../.env" 
});

const apiKey = process.env.TWILIO_ACCOUNT_SID;
const secret = process.env.TWILIO_AUTH_TOKEN;

console.log(apiKey);
console.log(secret);