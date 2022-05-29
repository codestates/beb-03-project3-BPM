const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketPostsSchema = new Schema(
  {
    title: String,
    body: String,
    cost: Number,
    tokenId: Number,
    nfts_id: { type: mongoose.Schema.Types.ObjectId, ref: "NFTs" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MarketPosts", marketPostsSchema);
