const express = require("express");
//Optional* Package "morgan" for seeing the endpoints, statuscode etc. in the terminal.
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/error");
//With this package, you don't have to write try catch in every async function call inside controller or anywhere, just specify it here using app.use()
require("express-async-errors");

require("./db");
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
//Using morgan
app.use(morgan("dev"));
app.use("/api/user", userRouter);

//Using express-async-errors
app.use(errorHandler);

app.listen(8000, () => {
  console.log("The port is listing on 8000");
});
