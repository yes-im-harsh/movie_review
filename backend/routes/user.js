const express = require("express");
const { create, verifyEmail } = require("../controllers/user");
const { userValidator, validate } = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidator, validate, create);
//Creating routes for verifying email.
router.post("/verify-email", verifyEmail);

module.exports = router;
