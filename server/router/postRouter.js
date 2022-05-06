const express = require("express");
const router = express.Router();
const {
  readAll,
  readById,
  update,
  create,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  like,
  unlike,
} = require("../controller/postController");

router.get("/:boardid", readAll);

router.get("/:postid", readById);

router.patch("/:postid", update);

router.post("/create", create);

router.delete("/:postid", deletePost);

router.post("/:postid/comment", createComment);

router.patch("/:postid/comment", updateComment);

router.delete("/:postid/comment", deleteComment);

router.post("/:postid/like", like);

router.delete("/:postid/unlike", unlike);

module.exports = router;
