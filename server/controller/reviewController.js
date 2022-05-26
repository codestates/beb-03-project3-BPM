const Reviews = require("../model/reviews");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Charts = require("../model/charts");
const Users = require("../model/users");
const Evaluations = require("../model/evaluations");
const { ObjectId } = require("mongodb");
const { tempotransfer } = require("./transfer/tempotransfer");

module.exports = {
  //리뷰 전체 조회 핸들러
  readAll: async (req, res) => {
    try {
      const reviews = await Reviews.find(
        {},
        {
          comments: true,
          likes: true,
          username: true,
          updatedAt: true,
        }
      )
        .populate("charts_id", {
          updatedAt: false,
          createdAt: false,
          __v: false,
        })
        .sort({
          updatedAt: "desc",
        });

      if (reviews) {
        res.status(200).send({ meesage: "리뷰 전체 조회 성공", data: reviews });
      } else {
        res.status(400).send({ message: "리뷰 전체 조회 실패" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "리뷰 전체 조회 실패" });
    }
  },

  //리뷰 상세 조회 핸들러
  readById: async (req, res) => {
    try {
      const reviewid = req.params.reviewid;
      const review = await Reviews.findOne({ _id: reviewid })
        .populate("charts_id", { updatedAt: false, createdAt: false })
        .populate("evaluations_id", { updatedAt: false, createdAt: false });

      if (review) {
        const data = [
          {
            id: review._id,
            title: review.charts_id.title,
            body: review.body,
            username: review.username,
            chart: review.charts_id,
            evaluation: review.evaluations_id,
            likes: review.likes.length,
            comments: review.comments,
            createdAt: review.createdAt,
          },
        ];
        res.status(200).send({ message: "리뷰 상세 조회 성공", data: data });
      } else {
        res.status(400).send({ message: "리뷰 상세 조회 실패" });
      }
    } catch (e) {
      res.status(500).send({ message: "리뷰 상세 조회 실패" });
    }
  },

  //리뷰 업데이트 핸들러
  update: async (req, res) => {
    try {
      const reviewid = req.params.reviewid;
      const { body } = req.body;
      const { popularity, artistry, lyrics, individuality, Addictive } =
        req.body.evaluation;

      const review = await Reviews.findOne({ _id: reviewid }).populate(
        "evaluations_id"
      );
      if (review) {
        await Reviews.updateOne({ _id: reviewid }, { $set: { body: body } });
        await Evaluations.updateOne(
          { _id: ObjectId(review.evaluations_id) },
          {
            $set: {
              popularity,
              artistry,
              lyrics,
              individuality,
              Addictive,
            },
          }
        );
        res.status(201).send({ success: true, message: "리뷰 수정 성공" });
      } else {
        res.status(400).send({ success: false, message: "리뷰 수정 실패" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },

  //리뷰 작성 핸들러
  create: async (req, res) => {
    // 날짜 함수
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth() + 1;
    const date = today.getUTCDate();
    try {
      const accessToken = req.cookies.accessToken;
      const { title, body } = req.body;
      const { popularity, artistry, lyrics, individuality, Addictive } =
        req.body.evaluation;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const charts_id = await Charts.findOne({ title });
        const evaluation = {
          charts_id: String(charts_id._id),
          popularity,
          artistry,
          lyrics,
          individuality,
          Addictive,
        };
        // 리뷰 중복 확인
        const reviewUser = await Reviews.find({
          $and: [
            { charts_id: String(charts_id._id) },
            { users_id: userinfo.id },
          ],
        });
        // 해당 유저가 작성한 글이 없으면 0
        if (reviewUser.length === 0) {
          // 평가항목을 추가하고 id 받아오기
          const evaluations_id = await Evaluations.create(evaluation);
          const user = await Users.find(
            { _id: userinfo.id },
            { username: true }
          );
          //쿠키에 있던 유저정보와 받아온 차트id, 평가id, 글내용 넣고 리뷰 생성
          const newReview = await Reviews.create({
            users_id: userinfo.id,
            username: user[0].username,
            body: body,
            charts_id: String(charts_id._id),
            evaluations_id: String(evaluations_id._id),
          });

          const dateReview = await Reviews.find({
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
          if (dateReview.length < 4) {
            tempotransfer(userinfo.address, "40");
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
          res.status(404).send({ success: false, message: "리뷰 작성 실패" });
        }
      }
    } catch (e) {
      res.status(500).send({ message: "서버 오류" });
    }
  },

  //댓글 작성 핸들러
  createComment: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;
      const id = req.params.reviewid;
      const comment = req.body.content;
      const today = new Date();

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const user = await Users.find({ _id: userinfo.id }, { username: true });
        const comments = await Reviews.findOneAndUpdate(
          { _id: id },
          {
            $push: {
              comments: [
                {
                  users_id: userinfo.id,
                  username: user[0].username,
                  comment: comment,
                  createdAt: today,
                },
              ],
            },
          }
        );
        if (comments) {
          res.status(200).send({ success: true, message: "댓글 작성 성공" });
        } else {
          res.status(400).send({ success: false, message: "댓글 작성 실패" });
        }
      }
    } catch (e) {
      res.status(500).send({ message: "서버 오류" });
    }
  },

  //댓글 수정 핸들러
  updateComment: async (req, res) => {
    try {
      const id = req.params.reviewid;
      const comment = req.body.content;
      const commentid = req.params.commentid;
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const review = await Reviews.findOne({ _id: id });

        if (String(review.comments.id(commentid).users_id) === userinfo.id) {
          review.comments.id(commentid).comment = comment;
          const saveReview = await review.save();
          res.status(200).send({ success: true, message: "댓글 수정 성공" });
        } else {
          res.status(403).send({ message: "유저 정보 다름" });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },

  //댓글 삭제 핸들러
  deleteComment: async (req, res) => {
    try {
      const id = req.params.reviewid;
      const commentid = req.params.commentid;

      const comments = await Reviews.updateOne(
        { _id: id },
        {
          $pull: {
            comments: {
              _id: commentid,
            },
          },
        }
      );
      if (comments) {
        res.status(200).send({ message: "댓글 삭제 성공" });
      } else {
        res.status(400).send({ message: "댓글 삭제 실패" });
      }
    } catch (e) {
      res.status(500).send({ message: "서버 오류" });
    }
  },

  //좋아요 핸들러
  like: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;
      const reviewid = req.params.reviewid;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);

        const review = await Reviews.findOneAndUpdate(
          { _id: reviewid },
          { $push: { likes: [{ users_id: userinfo.id }] } }
        );
        if (review) {
          res.status(201).send({ message: "좋아요 성공" });
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
      const reviewid = req.params.reviewid;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const review = await Reviews.updateOne(
          { _id: reviewid },
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
    const reviewid = req.params.reviewid;
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      res.status(404).send({ message: "accessToken not provided" });
    } else if (accessToken === "invalidtoken") {
      res
        .status(400)
        .send({ message: "invalid accesstoken, please login again" });
    } else {
      const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
      const like = await Reviews.findOne({ _id: reviewid }, { likes: true });
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
