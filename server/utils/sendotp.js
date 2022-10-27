const nodemailer = require("nodemailer");
require('dotenv').config();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      auth: {
        user: process.env.Email,
        pass: process.env.Pass
      }
    });

    function generateotp () {
      return Math.floor(100000 + Math.random() * 900000)
    }
  
  
module.exports = {transporter, generateotp };