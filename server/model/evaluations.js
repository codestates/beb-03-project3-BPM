const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationsSchema = new Schema(
  {
    charts_id: { type: mongoose.Schema.Types.ObjectId, ref: "Charts" },
    popularity: { type: Number, default: 0 },
    artistry: { type: Number, default: 0 },
    lyrics: { type: Number, default: 0 },
    individuality: { type: Number, default: 0 },
    Addictive: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluations", evaluationsSchema);
