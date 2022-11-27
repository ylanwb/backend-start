const { model, Schema, SchemaType } = require("mongoose");

const postScheme = new Schema({
  title: { type: String, required: [true, "title is required"], minLength: [5, "title length must be at least 5 characters"], maxLength: [100, "title length cannot exceed more than 100 characters"] },
  content: { type: String, required: [true, "content is required"], minLength: [5, "content length must be at least 5 characters"], maxLength: [200, "content length cannot exceed more than 200 characters"] },
  image: { type: String, required: [true, "image is required"] },
  owner: { type: Schema.ObjectId, ref: "User", required: true },
  publishDate: Date,
});

const Post = model("Post", postScheme);

module.exports = Post;
