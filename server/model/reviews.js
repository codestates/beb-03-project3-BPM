const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
  {
    title: String,
    body: String,
    users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    charts_id: { type: mongoose.Schema.Types.ObjectId, ref: "Charts" },
    evaluations_id: { type: mongoose.Schema.Types.ObjectId, ref: "Charts" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reviews", reviewsSchema);
