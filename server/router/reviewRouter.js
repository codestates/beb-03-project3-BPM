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
  checklike,
} = require("../controller/reviewController");

router.get("/", readAll);

router.get("/:reviewid", readById);

router.patch("/:reviewid", update);

router.post("/", create);

router.post("/:reviewid/comment", createComment);

router.patch("/:reviewid/comment/:commentid", updateComment);

router.delete("/:reviewid/comment/:commentid", deleteComment);

router.post("/:reviewid/like", like);

router.post("/:reviewid/unlike", unlike);

router.get("/:reviewid/checklike", checklike);

module.exports = router;
