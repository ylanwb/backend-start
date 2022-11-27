const { model, Schema, SchemaType } = require("mongoose");

const postScheme = new Schema({
  title: String,
  content: String,
  owner: { type: Schema.ObjectId, ref: "User", required: true },
});

const Post = model("Post", postScheme);

module.exports = Post;
