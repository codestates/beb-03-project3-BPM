const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationsSchema = new Schema(
	{
		popularity: { Number, default: 0 },
		artistry: { Number, default: 0 },
		lyrics: { Number, default: 0 },
		individuality: { Number, default: 0 },
		item: { Number, default: 0 },
	},
	{ timestamps: true }
);

const chartsSchema = new Schema(
	{
		image: { type: String, required: true },
		title: { type: String, required: true },
		artist: { type: String, required: true },
		evaluations: [evaluationsSchema],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Charts", chartsSchema);
