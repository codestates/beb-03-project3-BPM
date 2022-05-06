const express = require("express");
const router = express.Router();
const {
  readAll,
  readById,
  update,
  create,
  createComment,
  updateComment,
  deleteComment,
  like,
  unlike,
} = require("../controller/reviewController");

router.get("/", readAll);

router.get("/:reviewid", readById);

router.patch("/:reviewid", update);

router.post("/", create);

router.post("/:reviewid/comment", createComment);

router.patch("/:reviewid/comment", updateComment);

router.delete("/:reviewid/comment", deleteComment);

router.post("/:reviewid/like", like);

router.delete("/:reviewid/unlike", unlike);
