const express = require("express");
const router = express.Router();
const {
  readAll,
  readById,
  update,
  create,
  deleteColumn,
  like,
  unlike,
  checklike,
} = require("../controller/columnController");

router.get("/", readAll);

router.get("/:columnid", readById);

router.patch("/:columnid", update);

router.post("/create", create);

router.delete("/:columnid", deleteColumn);

router.post("/:columnid/like", like);

router.post("/:columnid/unlike", unlike);

router.get("/:columnid/checklike", checklike);

module.exports = router;
