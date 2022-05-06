const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardsSchema = new Schema(
	{
		title: String,
	},
	{ timestamps: true }
);

const Boards = mongoose.model("Boards", boardsSchema);
const board1 = new Boards({
	title: "자유게시판",
});
board1
	.save()
	.then(() => {
		console.log("성공");
	})
	.catch((e) => {
		console.error(e);
	});
