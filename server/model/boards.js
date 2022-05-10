const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardsSchema = new Schema(
	{
		id: { type: Number, required: true, unique: true },
		title: { type: String, required: true, unique: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Boards", boardsSchema);
