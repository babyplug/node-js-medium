const User = require("../../models/user.js");

const getUserByUsername = async username => {
  try {
    return await User.findOne()
      .where("username", username)
      .lean();
  } catch (error) {
    console.log(error);
  }
};

const getUserWithoutPassword = async userId => {
  try {
    return await User.findById(userId)
      .select("-password")
      .lean();
  } catch (error) {
    console.log(error);
  }
};

const updateUserData = async (userId, data) => {
  try {
    return await User.findByIdAndUpdate(userId, data, { new: true }).lean();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserByUsername,
  getUserWithoutPassword,
  updateUserData
};
