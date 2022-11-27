const Post = require("../../mongoDb/postsSchema");
const User = require("../../mongoDb/usersSchema");

const validatePostId = async (request, response, next) => {
  const { postId } = request.params;
  try {
    const post = await Post.findById(postId);
    if (post) {
      next();
    } else {
      return response.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    return response.status(404).json({ message: "Not Found" });
  }
};
const validatePostBody = async (request, response, next) => {
  const { title, content, userId, image } = request.body;
  console.log(userId)
  try {
    if (!title || !content || !userId || !image) {
      return response
        .status(403)
        .json({ message: "Please provide title, content, image and userId." });
    } else {
      next()
    }
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};

module.exports = { validatePostId, validatePostBody };
