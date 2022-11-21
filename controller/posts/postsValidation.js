const Post = require("../../mongoDb/postsSchema");

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
  const body = request.body;
  try {
    const createdPost = await Post.create({ ...body });
    if (createdPost) {
      return response.status(201).json(createdPost);
    }
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};

module.exports = { validatePostId, validatePostBody };
