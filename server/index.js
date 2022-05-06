const cors = require("cors");
const express = require("express");
const app = express();
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const mainRouter = require("./router/mainRouter");
const boardRouter = require("./router/boardRouter");
const reviewRouter = require("./router/reviewRouter");

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

server = app.listen(4000);
console.log("http server runnning!!");
