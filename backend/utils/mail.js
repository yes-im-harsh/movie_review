const nodemailer = require("nodemailer");

//Function for generating OTP
exports.generateOTP = (otp_length = 6) => {
  let OTP = "";
  for (i = 1; i <= otp_length; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  return OTP;
};

exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: process.env.TRANSPORT_PORT,
    auth: {
      user: process.env.TRANSPORT_USER,
      pass: process.env.TRANSPORT_PASSWORD,
    },
  });
