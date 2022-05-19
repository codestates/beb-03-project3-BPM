const express = require("express");
const router = express.Router();
const { reviews, posts, comments } = require("../controller/mypageController");

router.get("/reviews", reviews);
router.get("/posts", posts);
router.get("/comments", comments);

module.exports = router;
