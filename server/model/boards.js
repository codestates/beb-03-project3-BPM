const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardsSchema = new Schema(
  {
    title: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Boards", boardsSchema);
