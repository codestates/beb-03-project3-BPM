const express = require("express");
const router = express.Router();
const {
  createWallet,
  getBalance,
  deploy,
  balanceOf,
  bpmtransfer,
  tempotransfer,
} = require("../controller/contractController");

router.post("/create", createWallet);
router.get("/getbalance", getBalance);
router.post("/deploy", deploy);
router.post("/balanceof", balanceOf);
router.post("/bpmtransfer", bpmtransfer);
router.post("/tempotransfer", tempotransfer);

module.exports = router;
