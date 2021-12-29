const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const fileUpload = require('express-fileupload') 

const indexRouter = require("./routes/index");
const bookListRouter = require("./routes/bookList");
const bookDetailRouter = require("./routes/bookDetail");
const loginRouter = require("./routes/login");
const googleLoginRouter = require("./routes/googleLogin");
const signupRouter = require("./routes/signup");
const refreshTokenRouter = require("./routes/refreshToken");
const userListRouter = require("./routes/userList");
const uploadRouter = require("./routes/addBookToCatalogue");
const userProfileRouter = require("./routes/userProfile");
const orderRouter = require("./routes/orders");
const reviewRouter = require("./routes/reviews")
const cartRouter = require("./routes/cart");
const paymentRouter = require("./routes/payment");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("error", (error) => console.log(error));

require("./core/auth");

// passport.authenticate('jwt', { session: false }),

app.use("/", indexRouter);
app.use("/books", bookListRouter);
app.use("/book", bookDetailRouter);
app.use("/login", loginRouter);
app.use("/google-login", googleLoginRouter);
app.use("/signup", signupRouter);
app.use("/refresh", refreshTokenRouter);
app.use("/users", userListRouter);
app.use("/upload", passport.authenticate('jwt', { session: false }), uploadRouter);
app.use("/me", passport.authenticate('jwt', { session: false }), userProfileRouter);
app.use("/orders", passport.authenticate('jwt', { session: false }), orderRouter);
app.use("/reviews", reviewRouter);
app.use("/cart", passport.authenticate('jwt', { session: false }), cartRouter);
app.use("/Payment", passport.authenticate('jwt', { session: false }), paymentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err.message);

  // send the error response
  res.send(err.status || 500);
});

module.exports = app;
