const User = require("../../models/user.js");

const getUserByUsername = async username => {
  return await User.findOne()
    .where("username", username)
    .lean();
};

const getUserWithoutPassword = async userId => {
  return await User.findById(userId)
    .select("-password")
    .lean();
};

module.exports = {
  getUserByUsername,
  getUserWithoutPassword
};
