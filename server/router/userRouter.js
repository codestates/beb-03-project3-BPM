const express = require("express");
const router = express.Router();
const {
  signin,
  signup,
  mypage,
  update,
  logout,
} = require("../controller/userController");

router.post("/signin", signin);

router.post("/signup", signup);

router.post("/logout", logout);

router.get("/mypage", mypage);

router.patch("/update", update);

module.exports = router;
