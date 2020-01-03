const UserModel = require("../../models/user");

const getUserByUsername = async username => {
  try {
    return await UserModel.findOne()
      .where("username", username)
      .lean();
  } catch (error) {
    console.log(error);
  }
};

const getUserWithoutPassword = async userId => {
  try {
    return await UserModel.findById(userId)
      .select("-password")
      .lean();
  } catch (error) {
    console.log(error);
  }
};

const updateUserData = async (userId, data) => {
  try {
    return await UserModel.findByIdAndUpdate(userId, data, {
      new: true
    }).lean();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserByUsername,
  getUserWithoutPassword,
  updateUserData
};
