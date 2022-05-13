const { ethers } = require("ethers");
const Admin = require("../model/admin");
const dotenv = require("dotenv");
const { abi } = require("../erc-20/abi");
const { bytecode } = require("../erc-20/bytecode");
dotenv.config();
const provider = new ethers.providers.JsonRpcProvider(
  process.env.INFURA_APIKEY
);

module.exports = {
  createWallet: async (req, res) => {
    try {
      const wallet = ethers.Wallet.createRandom();
      const admin = await Admin.create({
        address: wallet.address,
        privatekey: wallet.privateKey,
      });

      res.status(201).send({ message: "서버 계정 생성 성공" });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },

  getBalance: async (req, res) => {
    const admin = await Admin.find({});
    const balance = await provider.getBalance(admin[0].address);

    res.status(200).send({
      balance: ethers.utils.formatEther(balance),
      message: "이더 잔액 조회 성공",
    });
  },
  deploy: async (req, res) => {
    const admin = await Admin.find({});
    const signer = provider.getSigner(admin[0].address);
    const signature = await signer.signMessage("bpm1234");
    const factory = new ethers.ContractFactory(abi, bytecode.object, signer);
    const contract = await factory.deploy(signature);
    console.log(contract);
  },

  balanceOf: async (req, res) => {},

  transfer: async (req, res) => {},
};
