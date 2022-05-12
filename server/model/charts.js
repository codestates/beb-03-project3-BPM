const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chartsSchema = new Schema(
	{
		image: { type: String, required: true },
		title: { type: String, required: true },
		artist: { type: String, required: true },
		total: { type: Number },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Charts", chartsSchema);
