const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
  {
    users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    username: { type: String, required: true },
    body: { type: String, required: true },
    comments: [
      {
        users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        username: { type: String },
        comment: { type: String },
        createdAt: { type: Date, required: true },
      },
    ],
    likes: [
      {
        users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      },
    ],
    charts_id: { type: mongoose.Schema.Types.ObjectId, ref: "Charts" },
    evaluations_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluations",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reviews", reviewsSchema);
