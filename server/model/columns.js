const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const columnsSchema = new Schema(
  {
    users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    charts_id: { type: mongoose.Schema.Types.ObjectId, ref: "Charts" },
    username: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    likes: [
      {
        users_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Columns", columnsSchema);
