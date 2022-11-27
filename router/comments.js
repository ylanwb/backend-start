const express = require("express");
const router = express.Router();

const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controller/comments/comments");

router.get("/", getComments);
router.get("/:commentId", getComment);
router.post("/", createComment);
router.put("/:commentId", updateComment);
router.delete("/:commentId", deleteComment), (module.exports = router);
