const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/helper");
const User = require("../models/user");

exports.isAuth = async (req, res, next) => {
  const token = req.headers?.authorization;
  // console.log((req.headers?.authorization))

  const jwtToken = token.split("Bearer ")[1];
  if (!jwtToken) return sendError(error, "Invalid Token");

  const decode = jwt.verify(jwtToken, process.env.SECRET_KEY);
  // console.log(decode)
  const { userId } = decode;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "Invalid token! User not found :(", 404);

  req.user = user;
  next();
};
