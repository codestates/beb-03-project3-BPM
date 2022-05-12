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
	ourchart: async (req, res) => {
		const chartid = await Charts.find(
			{},
			{
				image: false,
				title: false,
				artist: false,
				createdAt: false,
				updatedAt: false,
				__v: false,
			}
		);
		// evaluation 필드
		let popularity = 0;
		let lyrics = 0;
		let individuality = 0;
		let Addictive = 0;
		let artistry = 0;
		let popularityAvg = 0;
		let lyricsAvg = 0;
		let individualityAvg = 0;
		let AddictiveAvg = 0;
		let artistryAvg = 0;
		let total = 0;

		// evaluation 순회, 필드 별 값 합산
		for (let i = 0; i < chartid.length; i++) {
			// 곡 당 evaluation이 배열로 반환됨
			const evaluation = await Evaluations.find({
				charts_id: String(chartid[i]._id),
			});
			for (let j = 0; j < evaluation.length; j++) {
				if (evaluation[j] === undefined) {
					continue;
				} else {
					popularity += Number(evaluation[j].popularity);
					artistry += Number(evaluation[j].artistry);
					lyrics += Number(evaluation[j].lyrics);
					individuality += Number(evaluation[j].individuality);
					Addictive += Number(evaluation[j].Addictive);
				}
			}
			// chart_id 당 필드 평균
			popularityAvg = popularity / evaluation.length;
			lyricsAvg = artistry / evaluation.length;
			individualityAvg = lyrics / evaluation.length;
			AddictiveAvg = individuality / evaluation.length;
			artistryAvg = Addictive / evaluation.length;
			total =
				(popularityAvg +
					lyricsAvg +
					individualityAvg +
					AddictiveAvg +
					artistryAvg) /
				5;
			popularity = 0;
			lyrics = 0;
			individuality = 0;
			Addictive = 0;
			artistry = 0;
			const chart = await Charts.findOne({ _id: String(chartid[i]._id) });

			chart.total = total;
			await chart.save();
		}
	},
};
