const { ethers } = require("ethers");
const Admin = require("../model/admin");
const dotenv = require("dotenv");
const { bpmabi } = require("../contract/bpmabi");
const { bpmbytecode } = require("../contract/bpmbytecode");
const { tempoabi } = require("../contract/tempoabi");
const { tempobytecode } = require("../contract/tempobytecode");
dotenv.config();
const provider = new ethers.providers.JsonRpcProvider(
  process.env.INFURA_APIKEY
);

module.exports = {
  createWallet: async (req, res) => {
    try {
      const { title } = req.body;
      const wallet = ethers.Wallet.createRandom();
      const admin = await Admin.create({
        address: wallet.address,
        privatekey: wallet.privateKey,
        title: title,
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
    const bpmfactory = new ethers.ContractFactory(
      bpmabi,
      bpmbytecode.object,
      wallet
    );
    const bpmcontract = await bpmfactory.deploy();
    console.log(
      `Deployment successful! Contract Address: ${bpmcontract.address}`
    );

    const tempofactory = new ethers.ContractFactory(
      tempoabi,
      tempobytecode.object,
      wallet
    );
    const tempocontract = await tempofactory.deploy();
    console.log(
      `Deployment successful! Contract Address: ${tempocontract.address}`
    );

    res.status(201).send({
      message: "컨트랙트 배포 성공",
      contractAddress: {
        bpm: bpmcontract.address,
        tempo: tempocontract.address,
      },
    });
  },

  balanceOf: async (req, res) => {
    const { title } = req.body;
    const admin = await Admin.find({ title });
    const wallet = new ethers.Wallet(admin[0].privatekey, provider);
    const bpmcontract = new ethers.Contract(process.env.BPMCA, bpmabi, wallet);
    const bpmamount = await bpmcontract.balanceOf(wallet.address);
    const tempocontract = new ethers.Contract(
      process.env.TEMPOCA,
      tempoabi,
      wallet
    );
    const tempoamount = await tempocontract.balanceOf(wallet.address);

    res.status(200).send({
      BPMbalance: ethers.utils.formatEther(bpmamount),
      TEMPObalance: ethers.utils.formatEther(tempoamount),
      message: "토큰 조회 성공",
    });
  },

  bpmtransfer: async (req, res) => {
    try {
      const title = req.body.sender;
      const admin = await Admin.find({ title });
      const { recipient, amount } = req.body;
      const wallet = new ethers.Wallet(admin[0].privatekey, provider);
      const contract = new ethers.Contract(process.env.BPMCA, bpmabi, wallet);

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

  tempotransfer: async (req, res) => {
    try {
      const title = req.body.sender;
      const admin = await Admin.find({ title });
      const { recipient, amount } = req.body;
      const wallet = new ethers.Wallet(admin[0].privatekey, provider);
      const contract = new ethers.Contract(
        process.env.TEMPOCA,
        tempoabi,
        wallet
      );

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
