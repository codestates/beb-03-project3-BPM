const dummy = require("mongoose-dummy");
const Users = require("../model/users");
const Boards = require("../model/boards");
const Evaluations = require("../model/evaluations");
const NFTs = require("../model/nfts");
const Posts = require("../model/posts");
const Reviews = require("../model/reviews");
const Charts = require("../model/charts");

module.exports = {
	create: async (req, res) => {
		for (let i = 0; i < 10; i++) {
			Users.create(dummy(Users, { returnDate: true }));
			Boards.create(dummy(Boards, { returnDate: true }));
			Evaluations.create(dummy(Evaluations, { returnDate: true }));
			NFTs.create(dummy(NFTs, { returnDate: true }));
			Posts.create(dummy(Posts, { returnDate: true }));
			Reviews.create(dummy(Reviews, { returnDate: true }));
			Charts.create(dummy(Charts, { returnDate: true }));
		}
		res.send({ message: "success create dummy" });
	},
};
