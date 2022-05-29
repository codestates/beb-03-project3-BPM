const Charts = require("../model/charts");
const Columns = require("../model/columns");
const Reviews = require("../model/reviews");
const { ObjectId } = require("mongodb");

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
	detailById: async function (req, res) {
		const chartid = req.params.chartid;

		try {
			const songInfo = await Charts.findOne({ _id: chartid });
			const columns = await Columns.find({ charts_id: chartid })
				.sort({
					"createdAt": "desc",
				})
				.limit(3);
			const reviews = await Reviews.find({ charts_id: chartid })
				.sort({
					"createdAt": "desc",
				})
				.limit(10);

			if (songInfo !== null) {
				const data = [
					{
						id: ObjectId(songInfo._id),
						image: songInfo.image.slice(0, 86),
						title: songInfo.title,
						artist: songInfo.artist,
						total: songInfo.total,
						AddictiveAvg: songInfo.AddictiveAvg,
						artistryAvg: songInfo.artistryAvg,
						individualityAvg: songInfo.individualityAvg,
						lyricsAvg: songInfo.lyricsAvg,
						popularityAvg: songInfo.popularityAvg,
						columns,
						reviews,
					},
				];
				res.status(200).send({ success: true, data, message: "ok" });
			} else {
				res.status(404).send({ success: false, data: null, message: "fail" });
			}
		} catch (e) {
			console.error(e);
			res.status(500).send({ message: "서버 오류" });
		}
	},
};
