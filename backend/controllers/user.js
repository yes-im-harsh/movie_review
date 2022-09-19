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
  if (!token) return res.json({ error: "Token not found!" });

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return res.json({ error: "Please submit a valid OPT!" });

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);
  res.json({ message: "Your Email is Verified." });

  //Sending Welcome Message
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
    to: user.email,
    subject: "Welcome Email",
    html: `
    
    <h1>Welcome to our App. Thanks for choosing us :)</h1>`,
  });
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.json({ error: "User not found!" });
  if (user.isVerified) return res.json({ error: "User is already verified!" });
  const alreadyHadToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (alreadyHadToken)
    return res.json({
      error: "Only after one hour you can request for another token!",
    });

  //Then, Redo the whole process(from line 18)

  // Generating 6 digit OTP.
  let OTP = "";
  for (i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  // Saving OTP inside database.
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
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
    to: user.email,
    subject: "Email Verification",
    html: `
    <p>Your Verification OTP</p>
    <h1>${OTP}</h1>`,
  });

  res.status(201).json({
    message: "New OTP has been sent to your registered email.",
  });
};
