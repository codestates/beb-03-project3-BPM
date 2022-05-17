const Boards = require("../model/boards");

module.exports = {
  // 게시판 생성 핸들러
  create: async (req, res) => {
    const { title, subtitle } = req.body;
    try {
      const existed = await Boards.findOne({ title: title });
      if (!existed) {
        // db 생성
        await Boards.create({
          title,
          subtitle,
        });
        return res.status(201).send({
          success: true,
          data: null,
          message: "요청하신 게시판은 검토를 통해 생성됩니다.",
        });
      } else {
        res
          .status(404)
          .send({ success: false, message: "이미 존재하는 게시판입니다." });
      }
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .send({ succcess: false, message: "Failed to create board" });
    }
  },
  read: async (req, res) => {
    try {
      const boardInfo = await Boards.find(
        {},
        { _id: true, title: true, subtitle: true }
      );
      res.status(200).send({
        success: true,
        data: boardInfo,
        message: "게시판을 조회했습니다.",
      });
    } catch (e) {
      res
        .status(400)
        .send({ succcess: false, message: "Failed to search boards" });
    }
  },
  // 게시판 이름 변경 핸들러
  update: async (req, res) => {
    const { id, title, subtitle } = req.body;
    try {
      const existed = await Boards.updateOne(
        { _id: id },
        {
          $set: { title: title, subtitle: subtitle },
        }
      );
      res.status(201).send({
        success: true,
        data: null,
        message: "요청하신 변경 사항은 검토를 통해 반영됩니다.",
      });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .send({ success: false, message: "Failed to update board title" });
    }
  },
};
