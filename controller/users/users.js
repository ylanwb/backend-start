const User = require("../../models/usersSchema");
const date = require("date-and-time");

exports.getUsers = async (request, response) => {
  const users = User.find({}, (err, allUsers) => {
    if (err) {
      response.status(500).json({ message: "Can't retrieve the users" });
    }
    response.status(200).json(allUsers);
  });
  console.log(users);
};

exports.getUser = async (request, response) => {
  const { userId } = request.params;
  try {
    const user = await User.findById(userId);
    response.status(200).json(user);
  } catch (err) {
    response.status(500).json({ error: err });
  }
};

exports.createUser = async (request, response) => {
  const { firstName, lastName, email } = request.body;
  const now = new Date();
  const value = date.format(now, "YYYY/MM/DD h:MM:ss");
  try {
    const createdUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      registerDate: value,
    });
    return response.status(201).json(createdUser);
  } catch (err) {
    return response.status(500).json({ message: `${err} is the error` });
  }
};
exports.updateUser = async (request, response) => {
  const { userId } = request.params;
  const body = request.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, body, request.newData);
    return response
      .status(202)
      .json({ message: "successfully updated the user" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};
exports.deleteUser = async (request, response) => {
  const { userId } = request.params;
  try {
    await User.findByIdAndRemove({ _id: userId });
    return response
      .status(202)
      .json({ message: "successfully removed the user" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};
