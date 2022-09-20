const express = require("express");
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
} = require("../controllers/user");
const { isValidPasswordResetToken } = require("../middlewares/user");
const {
  userValidator,
  validate,
  validatePassword,
} = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidator, validate, create);
//Creating route for verifying email.
router.post("/verify-email", verifyEmail);
//Creating route for re-verifying email.
router.post("/reverify-email", resendEmailVerificationToken);
//Route for forget password.
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-password-reset-token",
  isValidPasswordResetToken,
  sendResetPasswordTokenStatus
);
router.post(
  "/reset-password",
  validatePassword,
  validate,
  isValidPasswordResetToken,
  resetPassword
);

module.exports = router;
