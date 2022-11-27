const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { validateCommentId, validateCommentBody } = require("./commentsValidation");
const Post = require("../../mongoDb/postsSchema");
const User = require("../../mongoDb/usersSchema");
const Comment = require("../../mongoDb/commentsSchema")
const date = require('date-and-time')
const router = express.Router();

router.get("/", async (request, response) => {
  const comments = Comment.find({}, (err, allComments) => {
    if (err) {
      response.status(500).json({ message: "Can't retrieve the comments" });
    }
    response.status(200).json(allComments);
  });
  console.log(comments);
});

router.get("/:commentId", validateCommentId, async (request, response) => {
  const { commentId } = request.params;
  try {
    const comment = await Comment.findById(commentId);
    response.status(200).json(comment);
  } catch (err) {
    response.status(500).json({ error: err });
  }
});

router.post("/", validateCommentBody, async (request, response) => {
  const { message, userId, postId } = request.body;
  const now  =  new Date();
  const value = date.format(now,'YYYY/MM/DD h:MM:ss');
  try {
    const user = await User.findById(userId)
    const post = await Post.findById(postId)
    const createdComment = await Comment.create({ message: message, post: post, owner: user, publishDate: value });
    return response.status(201).json(createdComment);
  } catch (err) {
    return response.status(500).json({ message: `${err} is the error` });
  }
});
router.put("/:commentId", validateCommentId, async (request, response) => {
  const { commentId } = request.params;
  const body = request.body;
  try {
    await Comment.findByIdAndUpdate({ _id: commentId }, body, request.newData);
    return response
      .status(202)
      .json({ message: "successfully updated the comment" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
});
router.delete("/:commentId", validateCommentId, async (request, response) => {
  const { commentId } = request.params;
  try {
    await Comment.findByIdAndRemove({ _id: commentId });
    return response
      .status(202)
      .json({ message: "successfully removed the comment" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
}),
  (module.exports = router);
``;
