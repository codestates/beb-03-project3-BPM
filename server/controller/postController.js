const Posts = require("../model/posts");
const Users = require("../model/users");
const Boards = require("../model/boards");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { bpmtransfer } = require("./transfer/bpmtransfer");

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  // post 게시판 별 전체 조회 핸들러
  readAll: async (req, res) => {
    const boardid = req.params.boardid;
    try {
      const post = await Posts.find(
        { boards_id: boardid },
        {
          _id: true,
          boards_id: true,
          title: true,
          createdAt: true,
          username: true,
          likes: true,
        }
      )
        .populate("boards_id", { title: true, subtitle: true })
        .sort({
          createdAt: "desc",
        });
      if (post.length > 0) {
        res.status(200).send({
          success: true,
          data: post,
          message: `총 ${post.length} 개의 글이 있습니다.`,
        });
      } else {
        const board = await Boards.find({ _id: boardid });
        const data = [
          {
            boards_id: {
              title: board[0].title,
              subtitle: board[0].subtitle,
            },
          },
        ];
        res.status(200).send({
          success: true,
          data: data,
          message: "작성된 게시글이 없습니다.",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(404).send({
        success: false,
        data: null,
        message: "해당 게시판이 존재하지 않습니다.",
      });
    }
  },
  // post 상세 조회 핸들러
  readById: async (req, res) => {
    const boardid = req.params.boardid;
    const postid = req.params.postid;

    try {
      const post = await Posts.find(
        { $and: [{ boards_id: ObjectId(boardid) }, { _id: postid }] },
        {
          username: true,
          boards_id: true,
          title: true,
          body: true,
          createdAt: true,
          comments: true,
          likes: true,
        }
      );
      if (post.length > 0) {
        const data = [
          {
            id: post[0]._id,
            title: post[0].title,
            body: post[0].body,
            username: post[0].username,
            likes: post[0].likes.length,
            comments: post[0].comments,
            createdAt: post[0].createdAt,
          },
        ];

        res.status(200).send({
          success: true,
          data: data,
          message: "해당 글이 조회되었습니다.",
        });
      } else {
        res.status(404).send({
          success: true,
          data: null,
          message: "해당 글이 존재하지 않습니다.",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },
  // post 수정 핸들러
  update: async (req, res) => {
    const boardid = req.params.boardid;
    const postid = req.params.postid;
    const { title, body } = req.body;
    try {
      const updated = await Posts.findOneAndUpdate(
        { $and: [{ boards_id: ObjectId(boardid) }, { _id: postid }] },
        {
          $set: {
            title: title,
            body: body,
          },
        }
      );
      if (updated === null) {
        res.status(404).send({
          success: false,
          data: null,
          message: "해당 글이 존재하지 않습니다.",
        });
      } else {
        res
          .status(201)
          .send({ success: true, data: null, message: "글이 수정되었습니다." });
      }
    } catch (e) {
      console.error(e);
      res
        .status(400)
        .send({ succcess: false, message: "Failed to update post" });
    }
  },
  // post 작성 핸들러
  create: async (req, res) => {
    const boardid = req.params.boardid;
    const { title, body } = req.body;
    // 날짜 함수
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth() + 1;
    const date = today.getUTCDate();

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
        const user = await Users.find({ _id: userinfo.id }, { username: true });
        const newPost = await Posts.create({
          users_id: userinfo.id,
          boards_id: boardid,
          username: user[0].username,
          title: title,
          body: body,
        });
        if (newPost) {
          const datePost = await Posts.find({
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
          if (datePost.length === 1) {
            bpmtransfer(userinfo.address, "15");
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
          res
            .status(404)
            .send({ success: false, data: null, message: "글 작성 실패" });
        }
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },
  // post 삭제 핸들러
  deletePost: async (req, res) => {
    const boardid = req.params.boardid;
    const postid = req.params.postid;
    try {
      const existed = await Posts.find({
        $and: [{ boards_id: ObjectId(boardid) }, { _id: postid }],
      });
      if (existed.length === 1) {
        await Posts.deleteOne({
          $and: [{ boards_id: ObjectId(boardid) }, { _id: postid }],
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
  // 댓글 작성 핸들러
  createComment: async (req, res) => {
    const boardid = req.params.boardid;
    const postid = req.params.postid;
    const { body } = req.body;
    // 날짜 함수
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth() + 1;
    const date = today.getUTCDate();

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
        const user = await Users.find({ _id: userinfo.id }, { username: true });
        const comments = await Posts.updateOne(
          { $and: [{ boards_id: ObjectId(boardid) }, { _id: postid }] },
          {
            $push: {
              comments: [
                {
                  users_id: userinfo.id,
                  username: user[0].username,
                  body: body,
                  createdAt: today,
                },
              ],
            },
          }
        );
        if (comments) {
          const dateComment = await Posts.aggregate([
            { $unwind: "$comments" },
            {
              $match: {
                "comments.username": user[0].username,
                "comments.createdAt": {
                  $gte: new Date(`${year}-${month}-${date}`),
                  $lt: new Date(`${year}-${month}-${date + 1}`),
                },
              },
            },
            {
              $group: {
                _id: "$comments.username",
                comments: { $push: "$comments.createdAt" },
              },
            },
          ]);

          if (dateComment[0].comments.length < 4) {
            bpmtransfer(userinfo.address, "5");
            res.status(200).send({
              success: true,
              data: null,
              message: "댓글 작성 성공, 토큰 지급",
            });
          } else {
            res.status(200).send({
              success: true,
              data: null,
              message: "댓글 작성 성공, 토큰 미지급",
            });
          }
        } else {
          res
            .status(404)
            .send({ success: false, data: null, message: "댓글 작성 실패 " });
        }
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },
  // 댓글 수정 핸들러
  updateComment: async (req, res) => {
    const boardid = req.params.boardid;
    const postid = req.params.postid;
    const commentid = req.params.commentid;
    const { body } = req.body;

    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        res.status(404).send({ message: "accessToken not provided" });
      } else if (accessToken === "invalidtoken") {
        res
          .status(400)
          .send({ message: "invalid accesstoken, please login again" });
      } else {
        const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const post = await Posts.findOne({
          $and: [{ boards_id: ObjectId(boardid) }, { _id: postid }],
        });

        if (String(post.comments.id(commentid).users_id) === userinfo.id) {
          post.comments.id(commentid).body = body;
          const savePost = await post.save();
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

  // 댓글 삭제 핸들러
  deleteComment: async (req, res) => {
    const boardid = req.params.boardid;
    const postid = req.params.postid;
    const commentid = req.params.commentid;
    try {
      const comment = await Posts.updateOne(
        {
          $and: [{ boards_id: ObjectId(boardid) }, { _id: postid }],
        },
        {
          $pull: {
            comment: {
              _id: commentid,
            },
          },
        }
      );
      if (comment) {
        res.status(200).send({ message: "댓글 삭제 성공" });
      } else {
        res.status(400).send({ message: "댓글 삭제 실패" });
      }
    } catch (e) {
      res.status(500).send({ message: "서버 오류" });
    }
  },
  // 좋아요 추가 핸들러
  like: async (req, res) => {
    const boardid = req.params.boardid;
    const postid = req.params.postid;
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
        //좋아요 중복 확인
        const like = await Posts.findOne({
          $and: [
            { boards_id: ObjectId(boardid) },
            { _id: postid },
            { "likes.users_id": { $eq: ObjectId(userinfo.id) } },
          ],
        });
        if (like) {
          res
            .status(201)
            .send({ success: false, data: null, message: "이미 좋아요 눌림" });
        } else if (like === null) {
          await Posts.updateOne(
            {
              $and: [
                { boards_id: ObjectId(boardid) },
                { _id: postid },
                { "likes.users_id": { $ne: ObjectId(userinfo.id) } },
              ],
            },
            { $push: { likes: [{ users_id: userinfo.id }] } }
          );
          res
            .status(201)
            .send({ success: true, data: null, message: "좋아요 성공" });
        } else {
          res
            .status(404)
            .send({ success: false, data: null, message: "좋아요 실패" });
        }
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },
  // 좋아요 취소 핸들러
  unlike: async (req, res) => {
    const boardid = req.params.boardid;
    const postid = req.params.postid;
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
        const like = await Posts.updateOne(
          {
            $and: [
              { boards_id: ObjectId(boardid) },
              { _id: postid },
              { "likes.users_id": ObjectId(userinfo.id) },
            ],
          },
          { $pull: { likes: { users_id: ObjectId(userinfo.id) } } }
        );
        if (like) {
          res
            .status(200)
            .send({ success: true, data: null, message: "좋아요 취소 성공" });
        } else {
          res
            .status(404)
            .send({ success: false, data: null, message: "좋아요 취소 실패" });
        }
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },

  checklike: async (req, res) => {
    const boardid = req.params.boardid;
    const postid = req.params.postid;
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      res.status(404).send({ message: "accessToken not provided" });
    } else if (accessToken === "invalidtoken") {
      res
        .status(400)
        .send({ message: "invalid accesstoken, please login again" });
    } else {
      const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
      const like = await Posts.findOne(
        { $and: [{ boards_id: ObjectId(boardid) }, { _id: postid }] },
        { likes: true }
      );
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
