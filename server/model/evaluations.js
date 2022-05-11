const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationsSchema = new Schema(
  {
    popularity: {
      score: { type: Number, default: 0 },
      body: { type: String },
    },
    artistry: {
      score: { type: Number, default: 0 },
      body: { type: String },
    },
    lyrics: {
      score: { type: Number, default: 0 },
      body: { type: String },
    },
    individuality: {
      score: { type: Number, default: 0 },
      body: { type: String },
    },
    Addictive: {
      score: { type: Number, default: 0 },
      body: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluations", evaluationsSchema);
