const Users = require("../model/users");
const Posts = require("../model/posts");
const Boards = require("../model/boards");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

module.exports = {
	// post 게시판 별 전체 조회 핸들러
	readAll: async (req, res) => {
		const boardid = req.params.boardid;
		try {
			const post = await Posts.find(
				{ boards_id: ObjectId(boardid) },
				{
					_id: false,
					boards_id: true,
					title: true,
					createdAt: true,
					username: true,
					likes: true,
				}
			).populate("boards_id", { title: true, subtitle: true });
			res.status(200).send({
				success: true,
				data: post,
				message: "게시판 포스트 조회 성공",
			});
		} catch (e) {
			console.error(e);
			res.status(500).send({
				success: false,
				data: null,
				message: "Failed to search posts ",
			});
		}
	},
	// post 상세 조회 핸들러
	readById: async (req, res) => {
		const postid = req.params.postid;
		try {
			const post = await Posts.findOne(
				{ id: postid },
				{
					username: true,
					title: true,
					body: true,
					createdAt: true,
					comments: true,
					likes: true,
				}
			);
			res
				.status(200)
				.send({ success: true, data: post, message: "포스트 상세 조회 성공" });
		} catch (e) {
			console.error(e);
			res.status(500).send({
				success: false,
				data: null,
				message: "Failed to search post ",
			});
		}
	},
	// post 수정 핸들러
	update: async (req, res) => {
		const postid = req.params.postid;
		const { username, title, body } = req.body;
		try {
			// db 업데이트
			await Posts.updateOne(
				{ index: postid },
				{
					$set: {
						username: username,
						title: title,
						body: body,
					},
				}
			);
			res
				.status(201)
				.send({ success: true, data: null, message: "글 수정 완료" });
		} catch (e) {
			console.error(e);
			res
				.status(400)
				.send({ succcess: false, message: "Failed to update post" });
		}
	},
	// post 작성 핸들러
	create: async (req, res) => {
		const { users_id, boards_id, username, title, body } = req.body;
		try {
			// db 생성
			const post = await Posts.find().populate("boards_id");
			console.log("🌸🌸🌸🌸🌸", post);

			await Posts.create({
				users_id,
				boards_id,
				username,
				title,
				body,
			});
			res
				.status(201)
				.send({ success: true, data: null, message: "글 작성 완료" });
		} catch (e) {
			console.error(e);
			res
				.status(400)
				.send({ succcess: false, message: "Failed to write post" });
		}
	},
	// post 삭제 핸들러
	deletePost: async (req, res) => {
		const postid = req.params.postid;
		try {
			const existed = await Posts.find({ index: postid });
			console.log("🌸🌸🌸🌸🌸", existed.length);
			if (existed.length === 1) {
				await Posts.deleteOne({ index: postid });
				res
					.status(200)
					.send({ success: true, data: null, message: "글 삭제 완료" });
			} else {
				res.status(404).send({
					succcess: false,
					data: null,
					message: "삭제할 글이 없습니다.",
				});
			}
		} catch (e) {
			console.error(e);
			res
				.status(500)
				.send({ succcess: false, message: "Failed to delete post" });
		}
	},
	// 댓글 작성 핸들러
	createComment: async (req, res) => {
		const postid = req.params.postid;
		const { users_id, username, body } = req.body;
		try {
			await Posts.updateOne(
				{ index: postid },
				{
					$push: {
						comments: [
							{
								users_id: users_id,
								username: username,
								body: body,
							},
						],
					},
				}
			);
			res.status(200).send({ success: true, data: null, message: "ok" });
		} catch (e) {
			console.error(e);
			res
				.status(500)
				.send({ succcess: false, message: "Failed to write comment" });
		}
	},
	// 댓글 수정 핸들러
	updateComment: async (req, res) => {
		const postid = req.params.postid;
		const { users_id, username, body } = req.body;
		try {
			await Posts.findOneAndUpdate(
				{ index: postid, comments },
				{
					$set: {
						comments: [
							{
								users_id: users_id,
								username: username,
								body: body,
							},
						],
					},
				}
			);
			res.status(200).send({ success: true, data: null, message: "ok" });
		} catch (e) {
			console.error(e);
			res
				.status(500)
				.send({ succcess: false, message: "Failed to write comment" });
		}
	},
	// 댓글 삭제 핸들러
	deleteComment: async (req, res) => {},
	// 좋아요 추가 핸들러
	like: async (req, res) => {
		const postid = req.params.postid;
		const accessToken = req.cookies.accessToken;
		if (!accessToken) {
			res.status(400).send({ message: "accessToken not provided" });
		} else if (accessToken === "invalidtoken") {
			res
				.status(400)
				.send({ message: "invalid accesstoken, please login again" });
		} else {
			const userinfo = jwt.verify(accessToken, "bpm1234");
			const like = await Posts.findOneAndUpdate(
				{ index: postid },
				{ $push: { likes: [{ users_id: userinfo.id }] } }
			);
			res.status(201).send({ success: true, data: null, message: "ok" });
		}
	},
	// 좋아요 취소 핸들러
	unlike: async (req, res) => {
		const postid = req.params.postid;
		const review = await Posts.findOneAndUpdate(
			{ index: postid },
			{ $pull: { likes: { users_id: userinfo.id } } }
		);
	},
};
