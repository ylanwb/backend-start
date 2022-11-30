const Comment = require("../../models/commentsSchema");
const Post = require("../../models/postsSchema");
const User = require("../../models/usersSchema");
const date = require("date-and-time");

exports.getComments = async (request, response) => {
  const comments = Comment.find({}, (err, allComments) => {
    if (err) {
      response.status(500).json({ message: "Can't retrieve the comments" });
    }
    response.status(200).json(allComments);
  });
  console.log(comments);
};

exports.getComment = async (request, response) => {
  const { commentId } = request.params;
  try {
    const comment = await Comment.findById(commentId).populate("post").populate("owner");
    response.status(200).json(comment);
  } catch (err) {
    response.status(500).json({ error: err });
  }
};

exports.createComment = async (request, response) => {
  const { message, userId, postId } = request.body;
  const now = new Date();
  const value = date.format(now, "YYYY/MM/DD h:MM:ss");
  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    const createdComment = await Comment.create({
      message: message,
      post: post,
      owner: user,
      publishDate: value,
    });
    return response.status(201).json(createdComment);
  } catch (err) {
    return response.status(500).json({ message: `${err} is the error` });
  }
};
exports.updateComment = async (request, response) => {
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
};
exports.deleteComment = async (request, response) => {
  const { commentId } = request.params;
  try {
    await Comment.findByIdAndRemove({ _id: commentId });
    return response
      .status(202)
      .json({ message: "successfully removed the comment" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};
