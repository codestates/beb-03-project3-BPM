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

router.get("/:boardid/:postid", readById);

router.patch("/:boardid/:postid", update);

router.post("/:boardid/create", create);

router.delete("/:boardid/:postid", deletePost);

router.post("/:boardid/:postid/comment", createComment);

router.patch("/:boardid/:postid/comment/:commentid", updateComment);

router.delete("/:boardid/:postid/comment/:commentid", deleteComment);

router.post("/:boardid/:postid/like", like);

router.delete("/:boardid/:postid/unlike", unlike);

module.exports = router;
