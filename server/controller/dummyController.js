const dummy = require("mongoose-dummy");
const Users = require("../model/users");
const Boards = require("../model/boards");
const Evaluations = require("../model/evaluations");
const NFTs = require("../model/nfts");
const Posts = require("../model/posts");
const PostsComments = require("../model/postsComments");
const PostsLikes = require("../model/postsLikes");
const Reviews = require("../model/reviews");
const ReviewsComments = require("../model/reviewsComments");
const ReviewsLikes = require("../model/reviewsLikes");

module.exports = {
  create: async (req, res) => {
    for (let i = 0; i < 10; i++) {
      Users.create(dummy(Users, { returnDate: true }));
      Boards.create(dummy(Boards, { returnDate: true }));
      Evaluations.create(dummy(Evaluations, { returnDate: true }));
      NFTs.create(dummy(NFTs, { returnDate: true }));
      Posts.create(dummy(Posts, { returnDate: true }));
      PostsComments.create(dummy(PostsComments, { returnDate: true }));
      PostsLikes.create(dummy(PostsLikes, { returnDate: true }));
      Reviews.create(dummy(Reviews, { returnDate: true }));
      ReviewsComments.create(dummy(ReviewsComments, { returnDate: true }));
      ReviewsLikes.create(dummy(ReviewsLikes, { returnDate: true }));
    }
    res.send({ message: "success create dummy" });
  },
};
