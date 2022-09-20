const express = require("express");
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
} = require("../controllers/user");
const { userValidator, validate } = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidator, validate, create);
//Creating route for verifying email.
router.post("/verify-email", verifyEmail);
//Creating route for re-verifying email.
router.post("/reverify-email", resendEmailVerificationToken);
//Route for forget password.
router.post("/forget-password", forgetPassword);

module.exports = router;
