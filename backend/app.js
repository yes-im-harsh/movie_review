const express = require("express");
require("./db");
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);

// app.get("/about", (req, res) => {
//   res.send("<h1>Hello I am from the backend /about :) </h1>");
// });

//Middleware
// app.post("/", middleware () => {}, (req,res)=> {})

app.post(
  "/sign-in",
  (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ error: "email/password missing :(" });
    next();
  },
  (req, res) => {
    res.send("<h1>Hello I am Sign-in</h1>");
  }
);

app.listen(8000, () => {
  console.log("The port is listing on 8000");
});
