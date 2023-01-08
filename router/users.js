const express = require("express");
const router = express.Router();
const { checkToken } = require("../authentication/jwt");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserPosts,
} = require("../controller/users/users");

router.get("/", checkToken, getUsers);
router.get("/:userId", checkToken, getUser);
router.get("/:userId/posts", checkToken, getUserPosts);
router.post("/", checkToken, createUser);
router.put("/:userId", checkToken, updateUser);
router.delete("/:userId", checkToken, deleteUser), (module.exports = router);
