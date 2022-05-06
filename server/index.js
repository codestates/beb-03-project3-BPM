const cors = require("cors");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const mainRouter = require("./router/mainRouter");
const boardRouter = require("./router/boardRouter");
const reviewRouter = require("./router/reviewRouter");
const e = require("express");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("wantit Backend Server");
});

app.use("/user", userRouter);
app.use("/main", mainRouter);
app.use("/board", boardRouter);
app.use("/post", postRouter);
app.use("/review", reviewRouter);

//mongoose 연결
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("success mongoose start");
  })
  .catch((e) => {
    console.log(e);
  });

server = app.listen(4000);
console.log("http server runnning!!");
