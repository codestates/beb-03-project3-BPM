const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 아직 뭐가 들어올지 모르므로 보류
// const chartsSchema = new Schema(
//   {

//   },
//   { timestamps: true }
// );

module.exports = mongoose.model("Charts", chartsSchema);
