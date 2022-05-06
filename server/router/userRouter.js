const express = require("express");
const router = express.Router();
const {
  signin,
  signup,
  mypage,
  update,
} = require("../controller/userController");

router.post("/signin", signin);

router.patch("/signup", signup);

router.get("/mypage", mypage);

router.patch("/update", update);
