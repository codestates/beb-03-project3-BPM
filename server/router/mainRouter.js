const express = require("express");
const router = express.Router();
const {
	allchart,
	ourchart,
	ourChartById,
	detailById,
} = require("../controller/mainController");

router.get("/allchart", allchart);

router.get("/ourchart", ourchart);

router.get("/:chartid", ourChartById);
router.get("/detail/:chartid", detailById);

module.exports = router;
