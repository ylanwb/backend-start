const data = require("../../db/usersData");
const express = require("express");
const e = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const User = require("../../mongoDb/usersSchema");
const { validateUserId, validateUserBody } = require("./usersValidation");

router.get("/", async (request, response) => {
  const users = User.find({}, (err, allUsers) => {
    if (err) {
      response.status(500).json({ message: "Can't retrieve the users" });
    }
    response.status(200).json(allUsers);
  });
  console.log(users);
});

router.get("/:userId", validateUserId, async (request, response) => {
  const { userId } = request.params;
  try {
    const user = await User.findById(userId);
    response.status(200).json(user);
  } catch (err) {
    response.status(500).json({ error: err });
  }
});

router.post("/", validateUserBody, async (request, response) => {
  const body = request.body;
  try {
    const createdUser = await User.create({ ...body });
    return response.status(201).json(createdUser);
  } catch (err) {
    return response.status(500).json({ message: err });
  }
});
router.put("/:userId", validateUserId, async (request, response) => {
  const { userId } = request.params;
});
router.delete("/:userId", validateUserId, async (request, response) => {
  const { userId } = request.params;
  try {
    await User.findByIdAndRemove({ _id: userId });
    return response
      .status(202)
      .json({ message: "successfully removed the user" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
}),
  (module.exports = router);
