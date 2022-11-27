const { model, Schema, SchemaType } = require("mongoose");

const commentsScheme = new Schema({
  message: { type: String, required: [true, "message is required"], minLength: [10, "message length must be at least 10 characters"], maxLength: [100, "message length cannot exceed more than 100 characters"] },
  publishDate: Date,
  owner: { type: Schema.ObjectId, ref: "User", required: true },
  post: { type: Schema.ObjectId, ref: "Post", required: true },
});

const Comment = model("Comment", commentsScheme);

module.exports = Comment;
