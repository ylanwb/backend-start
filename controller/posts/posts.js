const data = require("../../db/postsData");
const express = require("express");
const e = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { validatePostId, validatePostBody } = require("./postsValidation");
const Post = require("../../mongoDb/postsSchema");

router.get("/", async (request, response) => {
  const posts = Post.find({}, (err, allPosts) => {
    if (err) {
      response.status(500).json({ message: "Can't retrieve the posts" });
    }
    response.status(200).json(allPosts);
  });
  console.log(posts);
});

router.get("/:postId", validatePostId, async (request, response) => {
  const { postId } = request.params;
  try {
    const post = await Post.findById(postId);
    response.status(200).json(post);
  } catch (err) {
    response.status(500).json({ error: err });
  }
});

router.post("/", validatePostBody, async (request, response) => {
  const body = request.body;
  try {
    const createdPost = await Post.create({ ...body });
    return response.status(201).json(createdPost);
  } catch (err) {
    return response.status(500).json({ message: `${err} is the error` });
  }
});
router.put("/:postId", validatePostId, async (request, response) => {
  const { postId } = request.params;
  // 637aa822e771be7f25f245ac
  const body = request.body;
  // firstName, lastName
  try {
    await Post.findByIdAndUpdate({ _id: postId }, body, request.newData
    );
    return response.status(202).json({ message: "successfully updated the post" })
  } catch (err) {
    return response.status(500).json({ message: err })
  }
});
router.delete("/:postId", validatePostId, async (request, response) => {
  const { postId } = request.params;
  try {
    await Post.findByIdAndRemove({ _id: postId });
    return response
      .status(202)
      .json({ message: "successfully removed the post" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
}),
  (module.exports = router);
``
