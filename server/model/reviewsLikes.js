const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsLikesSchema = new Schema(
  {
    users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    reviews_id: { type: mongoose.Schema.Types.ObjectId, ref: "Reviews" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReviewsLikes", reviewsLikesSchema);
