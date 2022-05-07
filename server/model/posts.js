const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema(
	{
		author: { type: String, required: true },
		title: { type: String, required: true },
		body: { type: String, required: true },
		comments: [
			{
				author: { type: String, required: true },
				comment: { type: String, required: true },
			},
		],
		users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
		boards_id: { type: mongoose.Schema.Types.ObjectId, ref: "Boards" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);