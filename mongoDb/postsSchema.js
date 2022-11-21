const { model, Schema } = require("mongoose");

const postScheme = new Schema ({
    title: String,
    content: String,
})

const Post = model("Post", postScheme);

module.exports = Post;