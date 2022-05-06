const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationsSchema = new Schema(
  {
    popularity: Number,
    artistry: Number,
    lyrics: Number,
    individuality: Number,
    item: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluations", evaluationsSchema);
