const { model, Schema } = require("mongoose");

const UserScheme = new Schema({
  firstName: { type: String, required: [true, "firstName is required"], minLength: [3, "firstName length must be at least 3 characters"], maxLength: [50, "firstName cannot exceed more than 50 characters"] },
  lastName: { type: String, required: [true, "lastName is required"], minLength: [3, "lastName length must be at least 3 characters"], maxLength: [50, "lastName cannot exceed more than 50 characters"] },
  gender: String,
  email: { type: String, required: [true, "email is required"] },
  phone: String,
  picture: String,
  dateOfBirth: Date,
  registerDate: Date,
});

const User = model("User", UserScheme);

module.exports = User;