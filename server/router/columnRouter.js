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
} = require("../controller/columnController");

router.get("/", readAll);

router.get("/:columnid", readById);

router.patch("/:columnid", update);

router.post("/create", create);

router.delete("/:columnid", deleteColumn);

router.post("/:columnid/like", like);

router.post("/:columnid/unlike", unlike);

module.exports = router;
