const jwt = require("jsonwebtoken");
const Users = require("../model/users");
const Posts = require("../model/posts");
const { ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
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
				const user = await Users.find({ _id: userinfo.id });
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
						message: "작성 댓글 조회 성공",
						data: comments,
					});
				} else {
					res.status(400).send({ message: "작성 댓글 없음" });
				}
			}
		} catch (e) {
			console.log(e);
			res.status(500).send({ message: "서버 오류" });
		}
	},
};
