const express = require("express");
const router = express.Router();
const { create, update } = require("../controller/dummyController");

router.post("/", create);
router.patch("/", update);

module.exports = router;
