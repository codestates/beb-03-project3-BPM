const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dummy = require("mongoose-dummy");

const boardsSchema = new Schema(
	{
		id: { type: Number, required: true, unique: true },
		title: { type: String, required: true, unique: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Boards", boardsSchema);
