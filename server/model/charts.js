const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chartsSchema = new Schema(
	{
		image: { type: String, required: true },
		title: { type: String, required: true },
		artist: { type: String, required: true },
		evaluations_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Evaluations",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Charts", chartsSchema);
