const User = require("../../mongoDb/usersSchema");

const validateUserId = async (request, response, next) => {
  const { userId } = request.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      next();
    } else {
      return response.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    return response.status(404).json({ message: "Not Found" });
  }
};
const validateUserBody = async (request, response, next) => {
  const body = request.body;
  try {
    const createdUser = await User.create({ ...body });
    if (createdUser) {
      return response.status(201).json(createdUser);
    }
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};

module.exports = { validateUserId, validateUserBody };
