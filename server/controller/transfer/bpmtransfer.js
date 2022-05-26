const { ethers } = require("ethers");
const Admin = require("../../model/admin");
const dotenv = require("dotenv");
const { bpmabi } = require("../../contract/bpmabi");
dotenv.config();
const provider = new ethers.providers.JsonRpcProvider(
  process.env.INFURA_APIKEY
);

module.exports = {
  //특정 행동시 토큰 보상 핸들러
  bpmtransfer: async (recipient, amount) => {
    const admin = await Admin.find({});
    const wallet = new ethers.Wallet(admin[2].privatekey, provider);
    const contract = new ethers.Contract(process.env.BPMCA, bpmabi, wallet);

    const transfer = await contract.transfer(
      recipient,
      ethers.utils.parseUnits(amount, 18)
    );
  },
};
