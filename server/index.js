const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const mainRouter = require("./router/mainRouter");
const boardRouter = require("./router/boardRouter");
const reviewRouter = require("./router/reviewRouter");
const dummyRouter = require("./router/dummyRouter");
const chartRouter = require("./router/chartRouter");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("BPM Backend Server");
});

app.use("/user", userRouter);
app.use("/main", mainRouter);
app.use("/board", boardRouter);
app.use("/post", postRouter);
app.use("/review", reviewRouter);
//랜덤 시드 생성
app.use("/dummy", dummyRouter);
// 차트 생성
app.use("/chart", chartRouter);

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
