const nodemailer = require("nodemailer");
   
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      auth: {
        user: 'growpitaladarsh@gmail.com',
        pass: 'dmtwgyktqmfibeen'
      }
    });

    function generateotp () {
      return Math.floor(100000 + Math.random() * 900000)
    }
  
  
module.exports = {transporter, generateotp };