const bcrypt = require("bcryptjs");

const comparePassword = async (candidate, hashPassword) => {
  const isMatch = bcrypt.compareSync(candidate, hashPassword);
  return isMatch;
};

module.exports = {
  comparePassword
};
