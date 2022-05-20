const express = require("express");
const router = express.Router();
const {
	create,
	aggregate,
	detailById,
} = require("../controller/chartController");

router.post("/", create);
router.post("/aggregate", aggregate);
router.get("/:chartid", detailById);
module.exports = router;
