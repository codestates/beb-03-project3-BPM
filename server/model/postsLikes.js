const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsLikesSchema = new Schema(
	{
		users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
		posts_id: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("PostsLikes", postsLikesSchema);
