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
    const wallet = new ethers.Wallet(admin[0].privatekey, provider);
    const factory = new ethers.ContractFactory(abi, bytecode.object, wallet);
    const contract = await factory.deploy();
    console.log(`Deployment successful! Contract Address: ${contract.address}`);
    res.status(201).send({ message: "컨트랙트 배포 성공" });
  },

  balanceOf: async (req, res) => {
    const admin = await Admin.find({});
    const wallet = new ethers.Wallet(admin[0].privatekey, provider);
    const contract = new ethers.Contract(process.env.CA, abi, wallet);
    const amount = await contract.balanceOf(wallet.address);

    res.status(200).send({
      balance: ethers.utils.formatEther(amount),
      message: "토큰 조회 성공",
    });
  },

  transfer: async (req, res) => {
    try {
      const admin = await Admin.find({});
      const { recipient, amount } = req.body;
      const wallet = new ethers.Wallet(admin[0].privatekey, provider);
      const contract = new ethers.Contract(process.env.CA, abi, wallet);

      const transfer = await contract.transfer(
        recipient,
        ethers.utils.parseUnits(amount, 18)
      );
      if (transfer) {
        res.status(201).send({ message: "토큰 전송 성공" });
      } else {
        res.status(400).send({ message: "토큰 전송 실패" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },
};
