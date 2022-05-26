const Columns = require("../model/columns");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Charts = require("../model/charts");
const Users = require("../model/users");
const Evaluations = require("../model/evaluations");
const { tempotransfer } = require("./transfer/tempotransfer");

module.exports = {
  //칼럼 전체 조회 핸들러
  readAll: async (req, res) => {
    try {
      const columns = await Columns.find(
        {},
        {
          title: true,
          likes: true,
          username: true,
          updatedAt: true,
        }
      )
        .populate("charts_id", {
          total: false,
          AddictiveAvg: false,
          artistryAvg: false,
          individualityAvg: false,
          lyricsAvg: false,
          popularityAvg: false,
          updatedAt: false,
          createdAt: false,
          __v: false,
        })
        .sort({
          updatedAt: "desc",
        });

      if (columns) {
        res.status(200).send({ meesage: "칼럼 전체 조회 성공", data: columns });
      } else {
        res.status(400).send({ message: "칼럼 전체 조회 실패" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },

  //칼럼 상세 조회 핸들러
  readById: async (req, res) => {
    try {
      const id = req.params.columnid;
      const column = await Columns.findOne({ _id: id }).populate("charts_id", {
        total: false,
        AddictiveAvg: false,
        artistryAvg: false,
        individualityAvg: false,
        lyricsAvg: false,
        popularityAvg: false,
        updatedAt: false,
        createdAt: false,
        __v: false,
      });

      if (column) {
        const data = [
          {
            id: column._id,
            title: column.title,
            body: column.body,
            username: column.username,
            chart: column.charts_id,
            likes: column.likes.length,
            updatedAt: column.updatedAt,
          },
        ];

        res.status(200).send({ message: "칼럼 상세 조회 성공", data: data });
      } else {
        res.status(400).send({ message: "칼럼 상세 조회 실패" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "칼럼 상세 조회 실패" });
    }
  },

  //칼럼 업데이트 핸들러
  update: async (req, res) => {
    try {
      const id = req.params.columnid;
      const { title, body } = req.body;

      const column = await Columns.findOne({ _id: id });

      if (column) {
        column.title = title;
        column.body = body;
        await column.save();
        res.status(201).send({ success: true, message: "칼럼 수정 성공" });
      } else {
        res.status(400).send({ success: false, message: "칼럼 수정 실패" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },

  //칼럼 작성 핸들러
  create: async (req, res) => {
    // 날짜 함수
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth() + 1;
    const date = today.getUTCDate();
    try {
      const accessToken = req.cookies.accessToken;
      const { title, musictitle, body } = req.body;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const charts_id = await Charts.findOne({ title: musictitle });

        // 칼럼 중복 확인
        const columnUser = await Columns.find({
          $and: [
            { charts_id: String(charts_id._id) },
            { users_id: userinfo.id },
          ],
        });
        // 해당 유저가 작성한 글이 없으면 0
        if (columnUser.length === 0) {
          const user = await Users.find(
            { _id: userinfo.id },
            { username: true }
          );
          //쿠키에 있던 유저정보와 받아온 차트id, 평가id, 글내용 넣고 칼럼 생성
          const newColumn = await Columns.create({
            title: title,
            users_id: userinfo.id,
            username: user[0].username,
            body: body,
            charts_id: String(charts_id._id),
          });

          const dateColumn = await Columns.find({
            $and: [
              {
                createdAt: {
                  $gte: new Date(`${year}-${month}-${date}`),
                  $lte: new Date(`${year}-${month}-${date + 1}`),
                },
              },
              { users_id: userinfo.id },
            ],
          });
          if (dateColumn.length === 1) {
            tempotransfer(userinfo.address, "150");
            res.status(201).send({
              success: true,
              data: null,
              message: "성공, 토큰 지급",
            });
          } else {
            res.status(201).send({
              success: true,
              data: null,
              message: "성공, 토큰 미지급",
            });
          }
        } else {
          res.status(404).send({ success: false, message: "칼럼 작성 실패" });
        }
      }
    } catch (e) {
      res.status(500).send({ message: "서버 오류" });
    }
  },

  deleteColumn: async (req, res) => {
    const columnid = req.params.columnid;
    try {
      const existed = await Columns.find({
        _id: columnid,
      });

      if (existed.length === 1) {
        await Columns.deleteOne({
          _id: columnid,
        });
        res
          .status(200)
          .send({ success: true, data: null, message: "글 삭제 성공" });
      } else {
        res.status(404).send({
          succcess: false,
          data: null,
          message: "삭제할 글이 없습니다.",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },

  //좋아요 핸들러
  like: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;
      const id = req.params.columnid;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);

        const review = await Columns.findOneAndUpdate(
          { _id: id },
          { $push: { likes: [{ users_id: userinfo.id }] } }
        );
        if (review) {
          res.status(200).send({ message: "좋아요 성공" });
        } else {
          res.status(400).send({ message: "좋아요 실패" });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },

  //좋아요 취소 핸들러
  unlike: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;
      const id = req.params.columnid;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const review = await Columns.updateOne(
          { _id: id },
          { $pull: { likes: { users_id: userinfo.id } } }
        );
        if (review) {
          res.status(200).send({ message: "좋아요 취소 성공" });
        } else {
          res.status(200).send({ message: "좋아요 취소 실패" });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "서버오류" });
    }
  },

  checklike: async (req, res) => {
    const columnid = req.params.columnid;

    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      res.status(404).send({ message: "accessToken not provided" });
    } else if (accessToken === "invalidtoken") {
      res
        .status(400)
        .send({ message: "invalid accesstoken, please login again" });
    } else {
      const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
      const like = await Columns.findOne({ _id: columnid }, { likes: true });
      let flag = false;
      for (let i = 0; i < like.likes.length; i++) {
        if (String(like.likes[i].users_id) === userinfo.id) {
          flag = true;
          break;
        }
      }
      if (flag === true) {
        res.status(200).send({ message: "ok" });
      } else {
        res.status(200).send({ message: "no" });
      }
    }
  },
};
