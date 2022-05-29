const jwt = require("jsonwebtoken");
const Users = require("../model/users");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	//로그인 핸들러
	signin: async (req, res) => {
		const address = req.body.address;
		try {
			//db에서 address값으로 조회

			const user = await Users.findOne({ address: address });
			if (user === null) {
				res.status(201).send({ message: "계정 생성" });
			} else if (user !== []) {
				//조회했을때 있다면 accesstoken을 생성 후 쿠키에 실어보냄
				const { id, address, username, email } = user;
				const payload = { id, address, username, email };
				//액세스토큰 생성용 비밀키 추후 업데이트
				const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
					expiresIn: "6h",
				});

				res
					.status(200)
					.cookie("accessToken", accessToken, {
						httpOnly: true,
						domain: "localhost",
						path: "/",
						maxAge: 1000 * 60 * 60,
					})
					.send({ message: "로그인 성공", data: payload });
			} else {
				res.status(404).send({ success: false, message: "잘못된 요청" });
			}
		} catch (e) {
			console.log(e);
			res.status(500).send({ message: "서버오류" });
		}
	},

	//첫 로그인시 유저이름, 이메일 업데이트 핸들러
	signup: async (req, res) => {
		try {
			const { address, email, username } = req.body;

			if (address === "") {
				res.status(404).send({ message: "주소 없음" });
			} else {
				const name = await Users.findOne({ username });

				if (name === null) {
					//address로 조회하여 email과 name 업데이트
					const createUser = await Users.create({ address, email, username });

					//업데이트가 성공하면
					const payload = { address, username, email };
					const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
						expiresIn: "6h",
					});

					res
						.status(200)
						.cookie("accessToken", accessToken, {
							httpOnly: true,
							domain: "localhost",
							path: "/",
							maxAge: 1000 * 60 * 60,
						})
						.send({
							success: true,
							data: payload,
							message: "유저 이름, 이메일 업데이트 성공",
						});
				} else {
					res.status(400).send({ success: false, message: "이름 중복" });
				}
			}
		} catch (e) {
			console.log(e);
			res.status(500).send({ message: "서버오류" });
		}
	},

	logout: async (req, res) => {
		const accessToken = jwt.sign({ data: null }, process.env.ACCESS_SECRET, {
			expiresIn: "0h",
		});

		res.cookie("accessToken", "", {
			httpOnly: true,
			domain: "localhost",
			path: "/",
			maxAge: 0,
		});
		res.status(204).send({ message: "로그아웃" });
	},

	//mypage 조회 핸들러
	mypage: async (req, res) => {
		try {
			const accessToken = req.cookies.accessToken;

			if (!accessToken) {
				res.status(400).send({ message: "accessToken not provided" });
			} else if (accessToken === "invalidtoken") {
				res
					.status(400)
					.send({ message: "invalid accesstoken, please login again" });
			} else {
				const data = jwt.verify(accessToken, process.env.ACCESS_SECRET);
				const user = await Users.findOne({ _id: data.id });
				if (user) {
					res.status(200).send({ message: "유저 정보 조회 성공", data: user });
				} else {
					res.status(400).send({ message: "유저 정보 조회 실패" });
				}
			}
		} catch (e) {
			console.log(e);
			res.status(500).send({ message: "서버 오류" });
		}
	},

	//유저 정보 업데이트 핸들러
	update: async (req, res) => {
		try {
			const accessToken = req.cookies.accessToken;
			const { username, desc, email } = req.body;

			if (!accessToken) {
				res.status(400).send({ message: "accessToken not provided" });
			} else if (accessToken === "invalidtoken") {
				res
					.status(400)
					.send({ message: "invalid accesstoken, please login again" });
			} else {
				const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
				//username이 있다면
				if (username) {
					const name = Users.findOne({ username });

					if (name === null) {
						const update = await Users.updateOne(
							{ _id: userinfo.id },
							{
								$set: { username },
							}
						);

						if (update.modifiedCount === 1) {
							res.status(201).send({ message: "업데이트 성공" });
						} else {
							res.status(400).send({ message: "업데이트 실패" });
						}
					} else {
						res.status(404).send({ message: "이름 중복" });
					}
				} else if (email) {
					const update = await Users.updateOne(
						{ _id: userinfo.id },
						{
							$set: { email },
						}
					);

					if (update.modifiedCount === 1) {
						res.status(201).send({ message: "업데이트 성공" });
					} else {
						res.status(400).send({ message: "업데이트 실패" });
					}
				} else if (desc) {
					const update = await Users.updateOne(
						{ _id: userinfo.id },
						{
							$set: { desc },
						}
					);

					if (update.modifiedCount === 1) {
						res.status(201).send({ message: "업데이트 성공" });
					} else {
						res.status(400).send({ message: "업데이트 실패" });
					}
				} else {
					res.status(400).send({
						message: "이름 또는 이메일 또는 소개를 보내지 않았습니다",
					});
				}
			}
		} catch (e) {
			console.log(e);
			res.status(500).send({ message: "서버 오류" });
		}
	},
};
