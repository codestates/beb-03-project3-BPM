const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nftsSchema = new Schema(
  {
    metadata: { type: Object },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NFTs", nftsSchema);
