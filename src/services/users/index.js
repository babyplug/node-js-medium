const UserModel = require("../../models/user");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;
const jwt = require("jsonwebtoken");

// config
const config = require("../../config/config");

// utils
const bcryptUtils = require("../../utils/bcrypt");
const { FOLDER_PATH, convertB64toImage } = require("../../utils/images");

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

const updateUserData = () => async (req, res) => {
  try {
    try {
      const body = req.body;
      const data = new Object();

      if (body.name) {
        data.name = body.name;
      }
      if (body.surname) {
        data.surname = body.surname;
      }
      if (body.image && body.fileName) {
        data.image = await convertB64toImage(
          body.fileName,
          body.image,
          FOLDER_PATH.USER
        );
      }

      const _user = await UserModel.findByIdAndUpdate(req.user._id, data, {
        new: true
      }).lean();
      return res.json({ data: _user });
    } catch (error) {
      return res.json({ sucess: false, error: true, message: error.message });
    }
  } catch (error) {
    console.log(error);
  }
};

const validateLogin = body => {
  if (!body.username || !body.password)
    throw new Error("Please filled username or password !");
};

const login = () => async (req, res) => {
  validateLogin(req.body);
  const { username, password } = req.body;
  const _user = await getUserByUsername(username);

  if (_user) {
    if (bcryptUtils.comparePassword(password, _user.password)) {
      const _userInfo = await getUserWithoutPassword(_user._id);

      const token = jwt.sign(_userInfo, config.secret, {
        expiresIn: "1d"
      });

      return res.json({ success: true, token: token });
    }
  }
  return res.json({
    success: false,
    message: "Username or password is incorrect !"
  });
};

const validateRegister = body => {
  if (!body.username) throw new Error("Please filled username ");
  if (!body.password || !body.confirmPassword)
    throw new Error("Please filed password and confirm password");
  if (body.password !== body.confirmPassword)
    throw new Error("Password and confirm password not match !");
  if (!body.email) throw new Error("Please filled email ");
};

const register = () => async (req, res) => {
  validateRegister(req.body);
  const { username, password, email } = req.body;
  const hashPassword = bcrypt.hashSync(password, SALT_WORK_FACTOR);
  const data = { username, email, password: hashPassword };
  const user = new UserModel(data);
  const _user = await user.save();
  return res.json({ success: true, data: _user });
};

const getProfile = () => async (req, res) => {
  try {
    return res.json({ data: await getUserWithoutPassword(req.user._id) });
  } catch (error) {}
};

module.exports = {
  getUserByUsername,
  getUserWithoutPassword,
  updateUserData,
  login,
  register,
  getProfile
};
