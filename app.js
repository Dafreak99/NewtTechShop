var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
const User = require("./models/Users");
var app = express();
let mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://haitran:programmer2211@devconnector.uulq9.mongodb.net/seprojectt?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "dasdasdas",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/", indexRouter);
app.use("/user/", userRouter);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

module.exports = app;
