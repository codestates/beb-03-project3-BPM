const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    address: String,
    username: String,
    email: String,
    image: String,
    token: String,
    desc: String,
    nft_id: { type: mongoose.Schema.Types.ObjectId, ref: "NFTs" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", usersSchema);
