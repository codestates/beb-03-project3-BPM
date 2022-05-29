const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema(
  {
    users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    boards_id: { type: mongoose.Schema.Types.ObjectId, ref: "Boards" },
    username: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: [
      {
        users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        username: { type: String, required: true },
        body: { type: String },
        createdAt: { type: Date, required: true },
      },
    ],
    likes: [
      {
        users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);
