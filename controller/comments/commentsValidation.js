const Post = require("../../mongoDb/postsSchema");
const User = require("../../mongoDb/usersSchema");
const Comment = require("../../mongoDb/commentsSchema");

const validateCommentId = async (request, response, next) => {
    const { commentId } = request.params;
    try {
        const comment = await Comment.findById(commentId);
        if (comment) {
            next();
        } else {
            return response.status(404).json({ message: "Not Found" });
        }
    } catch (err) {
        return response.status(404).json({ message: "Not Found" });
    }
};
const validateCommentBody = async (request, response, next) => {
    const { message, postId, userId } = request.body;
    console.log(userId)
    console.log(postId)
    try {
        if (!message || !postId || !userId) {
            return response
                .status(403)
                .json({ message: "Please provide a message, postId and userId." });
        } else {
            next()
        }
    } catch (err) {
        return response.status(500).json({ message: err });
    }
};

module.exports = { validateCommentId, validateCommentBody };
