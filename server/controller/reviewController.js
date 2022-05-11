const Reviews = require("../model/reviews");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Charts = require("../model/charts");
const Evaluations = require("../model/evaluations");

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
      ).populate("charts_id", {
        updatedAt: false,
        createdAt: false,
        __v: false,
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
      const id = req.params.reviewid;
      const review = await Reviews.findOne({ _id: id })
        .populate("charts_id", { updatedAt: false, createdAt: false })
        .populate("evaluations_id", { updatedAt: false, createdAt: false });

      if (review) {
        const data = {
          id: review._id,
          title: review.charts_id.title,
          body: review.body,
          username: review.username,
          chart: review.charts_id,
          evaluation: review.evaluations_id,
          likes: review.likes.length,
          comments: review.comments,
          createdAt: review.createdAt,
        };
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
      const id = req.params.reviewid;
      const { body } = req.body;
      const { popularity, artistry, lyrics, individuality, Addictive } =
        req.body.evaluation;

      const review = await Reviews.findOne({ _id: id }).populate(
        "evaluations_id"
      );
      if (review) {
        review.body = body;
        review.evaluations_id.popularity = popularity;
        review.evaluations_id.artistry = artistry;
        review.evaluations_id.lyrics = lyrics;
        review.evaluations_id.individuality = individuality;
        review.evaluations_id.Addictive = Addictive;
        await review.save();
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
    try {
      const accessToken = req.cookies.accessToken;
      const { title, body } = req.body;
      const evaluation = req.body.evaluation;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const charts_id = await Charts.findOne({ title });
        // 평가항목을 추가하고 id 받아오기
        const evaluations_id = await Evaluations.create(evaluation);

        //쿠키에 있던 유저정보와 받아온 차트id, 평가id, 글내용 넣고 리뷰 생성
        const newReview = await Reviews.create({
          users_id: userinfo.id,
          username: userinfo.username,
          body: body,
          charts_id: String(charts_id._id),
          evaluations_id: String(evaluations_id._id),
        });

        if (newReview) {
          res.status(201).send({ success: true, message: "리뷰 작성 성공" });
        } else {
          res.status(400).send({ success: false, message: "리뷰 작성 실패" });
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

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const comments = await Reviews.findOneAndUpdate(
          { _id: id },
          {
            $push: {
              comments: [
                {
                  users_id: userinfo.id,
                  username: userinfo.username,
                  comment: comment,
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

      const review = await Reviews.findOne({ _id: id });

      if (review) {
        review.comments.id(commentid).comment = comment;
        const saveReview = await review.save();
        res.status(200).send({ success: true, message: "댓글 수정 성공" });
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
      const id = req.params.reviewid;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);

        const review = await Reviews.findOneAndUpdate(
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
      const id = req.params.reviewid;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const review = await Reviews.updateOne(
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
};
