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
const chartRouter = require("./router/chartRouter");
const contractRouter = require("./router/contractRouter");
const columnRouter = require("./router/columnRouter");
const mypageRouter = require("./router/mypageRouter");

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
app.use("/mypage", mypageRouter);
// 차트 생성
app.use("/chart", chartRouter);
app.use("/contract", contractRouter);
app.use("/column", columnRouter);
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
