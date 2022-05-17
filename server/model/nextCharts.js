const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nextChartsSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
});

module.exports = mongoose.model("nextCharts", nextChartsSchema);
