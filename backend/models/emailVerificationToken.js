const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// verificationToken : {
//  owner: id,
//  token: otp (hashed),
//  expiryDate: 1hr,
// }

const emailVerificationTokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

emailVerificationTokenSchema.pre("Save", async function (next) {
  if (this.isModified("token")) {
    const encryptedToken = await bcrypt.hash(this.token, 10);
    this.token = encryptedToken;
  }

  next();
});

module.exports = mongoose.model(
  "EmailVerificationToken",
  emailVerificationTokenSchema
);
