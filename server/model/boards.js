const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dummy = require("mongoose-dummy");

const boardsSchema = new Schema(
  {
    title: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Boards", boardsSchema);
