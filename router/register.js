const express = require("express");
const router = express.Router();
const { authRegister } = require("../authentication/authMiddleware");
const { createUser } = require("../controller/users/users");

router.post("/signUp", authRegister, createUser)

module.exports = router;
