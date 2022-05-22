const cheerio = require("cheerio");
const request = require("request");
const Charts = require("../model/charts");
const Evaluations = require("../model/evaluations");

module.exports = {
	create: async function (req, res) {
		let url = "https://www.melon.com/chart/";
		let title = new Array(),
			artist = new Array(),
			image = new Array(),
			up_date,
			up_time;
		let rank = 100;

		request(url, function (error, response, html) {
			if (!error) {
				let $ = cheerio.load(html);
				1;

				// 곡명 파싱
				for (let i = 0; i < rank; i++) {
					$(".ellipsis.rank01 > span > a").each(function () {
						let title_info = $(this);
						let title_info_text = title_info.text();
						title[i] = title_info_text;
						i++;
					});
				}

				// 아티스트명 파싱
				for (let i = 0; i < rank; i++) {
					$(".checkEllipsis").each(function () {
						let artist_info = $(this);
						let artist_info_text = artist_info.text();
						artist[i] = artist_info_text;
						i++;
					});
				}

				// 앨범커버 파싱
				for (let i = 0; i < rank; i++) {
					$(".image_typeAll > img").each(function () {
						let image_info = $(this);
						let image_info_attr = image_info.attr("src");
						image[i] = image_info_attr;
						i++;
					});
				}

				// 업데이트 날짜
				$(".year").each(function () {
					let date_info = $(this);
					let date_info_text = date_info.text();
					up_date = date_info_text;
				});

				// 업데이트 시간
				$(".hhmm > span").each(function () {
					let time_info = $(this);
					let time_info_text = time_info.text();
					up_time = time_info_text;
				});

				//xxxx년 xx월 xx일 오후/오전 xx시 format
				let up_date_arr = new Array();
				up_date_arr = up_date.split(".");
				let up_time_arr = new Array();
				up_time_arr = up_time.split(":");
				let newtime;

				// 오후 오전 삽입
				if (up_time_arr[0] > 12) {
					up_time_arr[0] = up_time_arr[0] - 12;
					newtime = "오후 " + up_time_arr[0];
				} else {
					newtime = "오전 " + up_time_arr[0];
				}

				// 콘솔창 출력
				console.log("< 멜론 차트 1 ~ " + rank + "위 >");

				// 순위 앨범커버 - 제목 - 아티스트명
				for (let i = 1; i < rank + 1; i++) {
					let object = {
						image: image[i - 1],
						title: title[i - 1],
						artist: artist[i - 1],
					};
					Charts.create(object);
				}
			}
		});
	},
	aggregate: async (req, res) => {
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
			if (popularity === 0) {
				popularityAvg = 0;
				lyricsAvg = 0;
				individualityAvg = 0;
				AddictiveAvg = 0;
				artistryAvg = 0;
				total = 0;
			} else {
				popularityAvg = popularity / evaluation.length;
				lyricsAvg = artistry / evaluation.length;
				individualityAvg = lyrics / evaluation.length;
				AddictiveAvg = individuality / evaluation.length;
				artistryAvg = Addictive / evaluation.length;
				if (evaluation.length < 2) {
					total =
						((popularityAvg +
							lyricsAvg +
							individualityAvg +
							AddictiveAvg +
							artistryAvg) /
							5) *
						0.2;
				} else if (evaluation.length >= 2 && evaluation.length < 5) {
					total =
						((popularityAvg +
							lyricsAvg +
							individualityAvg +
							AddictiveAvg +
							artistryAvg) /
							5) *
						0.4;
				} else if (evaluation.length >= 5 && evaluation.length < 7) {
					total =
						((popularityAvg +
							lyricsAvg +
							individualityAvg +
							AddictiveAvg +
							artistryAvg) /
							5) *
						0.6;
				} else if (evaluation.length >= 7 && evaluation.length < 10) {
					total =
						((popularityAvg +
							lyricsAvg +
							individualityAvg +
							AddictiveAvg +
							artistryAvg) /
							5) *
						0.9;
				} else if (evaluation.length >= 10) {
					total =
						(popularityAvg +
							lyricsAvg +
							individualityAvg +
							AddictiveAvg +
							artistryAvg) /
						5;
				}
			}
			// 필드 별 초기화
			popularity = 0;
			lyrics = 0;
			individuality = 0;
			Addictive = 0;
			artistry = 0;
			// Chart id에 맞는 total 저장
			const chart = await Charts.findOne({ _id: String(chartid[i]._id) });
			chart.popularityAvg = parseFloat(popularityAvg).toFixed(2);
			chart.lyricsAvg = parseFloat(lyricsAvg).toFixed(2);
			chart.individualityAvg = parseFloat(individualityAvg).toFixed(2);
			chart.AddictiveAvg = parseFloat(AddictiveAvg).toFixed(2);
			chart.artistryAvg = parseFloat(artistryAvg).toFixed(2);
			chart.total = parseFloat(total).toFixed(2);
			await chart.save();
		}
		res.status(201).send({ success: true, data: null, message: "ok" });
	},
};
