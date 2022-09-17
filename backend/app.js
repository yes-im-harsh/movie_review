const express = require("express");

const app = express();

// console.log(app)

app.get("/", (req, res) => {
  res.send("<h1>Hello I am from the backend :) </h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>Hello I am from the backend /about :) </h1>");
});

app.listen(8000, () => {
  console.log("The port is listing on 8000");
});
