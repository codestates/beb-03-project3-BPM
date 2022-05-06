const express = require("express");
const router = express.Router();
const { allchart, ourchart, create } = require("../controller/mainController");

router.get("/allchart", allchart);

router.get("/ourchart", ourchart);

router.post("/create", create);

module.exports = router;
