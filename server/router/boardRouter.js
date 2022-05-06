const express = require("express");
const router = express.Router();
const { create, read, update } = require("../controller/boardController");

router.post("/create", create);

router.get("/read", read);

router.get("/update", update);

module.exports = router;
