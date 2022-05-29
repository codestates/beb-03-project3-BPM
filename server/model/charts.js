const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chartsSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  popularityAvg: { type: Number },
  lyricsAvg: { type: Number },
  individualityAvg: { type: Number },
  AddictiveAvg: { type: Number },
  artistryAvg: { type: Number },
  total: { type: Number },
});

module.exports = mongoose.model("Charts", chartsSchema);
