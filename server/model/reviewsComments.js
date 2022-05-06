const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsCommentSchema = new Schema(
  {
    body: String,
    users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    reviews_id: { type: mongoose.Schema.Types.ObjectId, ref: "Reviews" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReviewsComments", reviewsCommentSchema);
