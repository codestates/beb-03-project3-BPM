const express = require("express");
const router = express.Router();
const {
  createWallet,
  getBalance,
  deploy,
  balanceOf,
  transfer,
} = require("../controller/contractController");

router.post("/create", createWallet);
router.get("/getbalance", getBalance);
router.post("/deploy", deploy);
router.get("/balanceof", balanceOf);
router.post("/transfer", transfer);

module.exports = router;
