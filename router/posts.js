const express = require("express");
const router = express.Router();

const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
  } = require("../controller/posts/posts");
  
  router.get("/", getPosts);
  router.get("/:postId", getPost);
  router.post("/", createPost);
  router.put("/:postId", updatePost);
  router.delete("/:postId", deletePost), (module.exports = router);
  