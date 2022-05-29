const express = require("express");
const router = express.Router();
const { create, aggregate } = require("../controller/chartController");

router.post("/", create);
router.post("/aggregate", aggregate);

module.exports = router;
