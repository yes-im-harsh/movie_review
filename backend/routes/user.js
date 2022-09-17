const express = require("express");
const { createUser } = require("../controllers/user");

const router = express.Router();

//post request*, will be getting error of not Cannot GET /create-user
router.post("/create-user", createUser);

module.exports = router;

//(1)

// const express = require("express");

// const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("<h1>This is coming from backend routes :)</h1>");
// });

// module.exports = router;
