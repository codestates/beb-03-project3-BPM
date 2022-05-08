const express = require("express");
const router = express.Router();
const { create } = require("../controller/chartController");

router.post("/", create);

module.exports = router;
