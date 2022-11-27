const { model, Schema } = require("mongoose");

const UserScheme = new Schema({
  firstName: { type: String, required: [true, "firstName is required"], minLength: [6,"firstName length must be at least 6 characters"] },
  lastName: { type: String, required: [true, "lastName is required"] },
  gender: String,
  email: String,
  phone: String,
  picture: String,
  dateOfBirth: Date,
});

const User = model("User", UserScheme);

module.exports = User;
