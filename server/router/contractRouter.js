const express = require("express");
const router = express.Router();
const {
  createWallet,
  getBalance,
  deploy,
} = require("../controller/contractController");

router.post("/create", createWallet);
router.get("/getbalance", getBalance);
router.post("/deploy", deploy);

module.exports = router;
