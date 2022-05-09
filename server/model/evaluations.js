const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationsSchema = new Schema(
	{
		id: { type: Number, required: true, unique: true },
		popularity: { type: Number, default: 0 },
		artistry: { type: Number, default: 0 },
		lyrics: { type: Number, default: 0 },
		individuality: { type: Number, default: 0 },
		item: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Evaluations", evaluationsSchema);
