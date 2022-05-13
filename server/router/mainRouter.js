const express = require("express");
const router = express.Router();
const {
  allchart,
  ourchart,
  ourChartById,
} = require("../controller/mainController");

router.get("/allchart", allchart);

router.get("/ourchart", ourchart);

router.get("/:chartid", ourChartById);

module.exports = router;
