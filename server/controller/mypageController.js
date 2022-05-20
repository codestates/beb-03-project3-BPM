const jwt = require("jsonwebtoken");
const Users = require("../model/users");
const Posts = require("../model/posts");
const Reviews = require("../model/reviews");
const { ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  // 내가 쓴 음악 리뷰 조회 핸들러
  reviews: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const reviews = await Reviews.find({ users_id: userinfo.id })
          .populate("charts_id", { updatedAt: false, createdAt: false })
          .populate("evaluations_id", { updatedAt: false, createdAt: false })
          .sort({
            createdAt: "asc",
          });

        if (reviews.length > 0) {
          res.status(200).send({
            success: true,
            data: reviews,
            message: "작성 글 조회 성공",
          });
        } else if (reviews.length === 0) {
          res.status(200).send({
            success: true,
            data: reviews,
            message: "작성 글 없음",
          });
        } else {
          res.status(400).send({ data: null, message: "조회 실패" });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },
  // 내가 쓴 글 조회 핸들러
  posts: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const posts = await Posts.find({ users_id: userinfo.id }).sort({
          createdAt: "asc",
        });
        if (posts.length > 0) {
          res.status(200).send({
            success: true,
            data: posts,
            message: "작성 글 조회 성공",
          });
        } else if (posts.length === 0) {
          res.status(200).send({
            success: true,
            data: posts,
            message: "작성 글 없음",
          });
        } else {
          res.status(400).send({ data: null, message: "조회 실패" });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },

  // 내가 쓴 댓글 조회 핸들러
  comments: async (req, res) => {
    try {
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        res.status(400).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const comments = await Posts.aggregate([
          { $unwind: "$comments" },
          {
            $match: {
              "comments.users_id": ObjectId(userinfo.id),
            },
          },
        ]);
        if (comments.length > 0) {
          res.status(200).send({
            success: true,
            data: comments,
            message: "작성 글 조회 성공",
          });
        } else if (comments.length === 0) {
          res.status(200).send({
            success: true,
            data: comments,
            message: "작성 글 없음",
          });
        } else {
          res.status(400).send({ data: null, message: "조회 실패" });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },
};
