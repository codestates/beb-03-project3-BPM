const Charts = require("../model/charts");
const Evaluations = require("../model/evaluations");

module.exports = {
  allchart: async (req, res) => {
    try {
      const chart = await Charts.find(
        {},
        { _id: true, image: true, title: true, artist: true }
      );
      res.status(200).send({ success: true, data: chart, message: "ok" });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .send({ success: false, message: "Failed to search chart" });
    }
  },
  ourchart: async (req, res) => {
    try {
      const sortChart = await Charts.find().sort({ total: -1 });

      res.status(200).send({ success: true, data: sortChart, message: "ok" });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },

  ourChartById: async (req, res) => {
    try {
      const charts_id = req.params.chartid;
      const chart = await Charts.find({ _id: charts_id }, { __v: false });
      if (chart) {
        res.status(200).send({ success: true, data: chart, message: "성공" });
      } else {
        res.status(400).send({ success: false, message: "실패" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "서버 오류" });
    }
  },
};
