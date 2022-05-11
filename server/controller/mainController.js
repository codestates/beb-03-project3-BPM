const Charts = require("../model/charts");
const Evaluations = require("../model/evaluations");

module.exports = {
  allchart: async (req, res) => {
    try {
      const chart = await Charts.find(
        {},
        { _id: false, image: true, title: true, artist: true }
      );
      res.status(200).send({ success: true, data: chart, message: "ok" });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .send({ success: false, message: "Failed to search chart" });
    }
  },
  ourchart: async (req, res) => {},
};
