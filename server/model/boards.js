const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardsSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Boards", boardsSchema);
