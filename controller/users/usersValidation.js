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
  const { firstName, lastName } = request.body;
  try {
    if (!firstName || !lastName) {
      return response
        .status(403)
        .json({ message: "Please provide firstName and lastName" });
    } else {
      next();
    }
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};

module.exports = { validateUserId, validateUserBody };
