const express = require("express");
const router = express.Router();
const { allchart, ourchart } = require("../controller/mainController");

router.get("/allchart", allchart);

router.get("/ourchart", ourchart);

module.exports = router;
