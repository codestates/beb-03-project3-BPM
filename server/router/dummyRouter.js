const express = require("express");
const router = express.Router();
const { create } = require("../controller/dummyController");

router.post("/", create);

module.exports = router;
