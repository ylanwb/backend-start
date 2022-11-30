const bcrypt = require("bcrypt");

module.exports.hashFunction = (password) => {
  const salt = bcrypt.genSaltSync(1);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports.compareHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
