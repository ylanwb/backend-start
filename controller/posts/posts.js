const Post = require("../../models/postsSchema");
const User = require("../../models/usersSchema");
const date = require("date-and-time");

exports.getPosts = async (request, response) => {
  Post.find({}, (err, allPosts) => {
    if (err) {
      response.status(500).json({ message: "Can't retrieve the posts" });
    }
    response.status(200).json(allPosts);
  });
};

exports.getPost = async (request, response) => {
  const { postId } = request.params;
  try {
    const post = await Post.findById(postId);
    response.status(200).json(post);
  } catch (err) {
    response.status(500).json({ error: err });
  }
};

exports.createPost = async (request, response) => {
  const { title, content, userId, image } = request.body;
  const now = new Date();
  const value = date.format(now, "YYYY/MM/DD h:MM:ss");
  try {
    // const user = await User.findById(userId)
    const createdPost = await Post.create({
      title: title,
      content: content,
      owner: userId,
      image: image,
      publishDate: value,
    });
    return response.status(201).json(createdPost);
  } catch (err) {
    return response.status(500).json({ message: `${err} is the error` });
  }
};
exports.updatePost = async (request, response) => {
  const { postId } = request.params;
  const body = request.body;
  try {
    await Post.findByIdAndUpdate({ _id: postId }, body, request.newData);
    return response
      .status(202)
      .json({ message: "successfully updated the post" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};
exports.deletePost = async (request, response) => {
  const { postId } = request.params;
  try {
    await Post.findByIdAndRemove({ _id: postId });
    return response
      .status(202)
      .json({ message: "successfully removed the post" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};
