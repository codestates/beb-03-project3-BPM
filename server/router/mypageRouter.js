const express = require("express");
const router = express.Router();
const { comments } = require("../controller/mypageController");

router.get("/comments", comments);

module.exports = router;
