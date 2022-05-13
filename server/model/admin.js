const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  address: String,
  privatekey: String,
});

module.exports = mongoose.model("Admin", adminSchema);
