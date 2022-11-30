const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// generate the token
module.exports.tokenGenerate = (firstName, userId) => {
  return jwt.sign(
    { firstName: firstName, userId: userId },
    process.env.JWT || "myTempSecret",
    {
      expiresIn: "1d",
    }
  );
};

// verify the token
module.exports.checkToken = async (req, response, next) => {
  const token = req.headers.authorization;
  console.log(token.split(" ")[1]);
  if (!token) {
    response.status(401).json({ message: "No authorization token provided!" });
    return;
  }
  jwt.verify(
    token.split(" ")[1],
    process.env.JWT || "myTempSecret",
    (err, result) => {
      if (err) {
        response.status(401).send("No authorization token provided");
        return;
      }
      response.locals.userId = result.userId;
      next();
      return;
    }
  );
};
