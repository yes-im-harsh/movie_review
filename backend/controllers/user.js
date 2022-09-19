const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  //Preventing Duplicate User
  const oldUser = await User.findOne({ email });
  if (oldUser)
    return res.status(401).json({ error: "This email is already in use" });

  const newUser = new User({ name, email, password });
  await newUser.save();

  // Generating 6 digit OTP.
  let OTP = "";
  for (i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  // Saving OTP inside database.
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  // Sending the OTP.
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: process.env.TRANSPORT_PORT,
    auth: {
      user: process.env.TRANSPORT_USER,
      pass: process.env.TRANSPORT_PASSWORD,
    },
  });

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: newUser.email,
    subject: "Email Verification",
    html: `
    <p>Your Verification OTP</p>
    <h1>${OTP}</h1>`,
  });

  res.status(201).json({
    message: "Please verify your email, an OTP has been sent to your account",
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return res.json({ error: "Invalid User!" });

  const user = await User.findById(userId);

  if (!user) return res.json({ error: "User not found!" });

  if (user.isVerified) return res.json({ error: "User is already verified!" });

  const token = await EmailVerificationToken.findOne({ owner: userId });
};
