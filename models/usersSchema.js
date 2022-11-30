const { model, Schema } = require("mongoose");

const UserScheme = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    minLength: [3, "firstName length must be at least 3 characters"],
    maxLength: [50, "firstName cannot exceed more than 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
    minLength: [3, "lastName length must be at least 3 characters"],
    maxLength: [50, "lastName cannot exceed more than 50 characters"],
  },
  gender: {
    type: String,
    enum: { values: ["Male", "Female"], message: "{Value} is not supported" },
  },
  email: { type: String, required: [true, "email is required"] },
  phone: String,
  picture: String,
  dateOfBirth: Date,
  registerDate: Date,
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "Password must be at least 8 characters"],
  },
});

UserScheme.path("email").validate((email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
});

const User = model("User", UserScheme);

module.exports = User;
