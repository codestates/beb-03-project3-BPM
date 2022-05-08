const cheerio = require("cheerio");
const request = require("request");
const Charts = require("../model/charts");

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
};
