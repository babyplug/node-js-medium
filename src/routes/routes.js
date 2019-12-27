const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;
const jwt = require("jsonwebtoken");

// config
const config = require("../config/config");

// models
const UserModel = require("../models/user");

// services
const userService = require("../services/users");

// utils
const bcryptUtils = require("../utils/bcrypt");

const validateRegister = body => {
  if (!body.username) throw new Error("Please filled username ");
  if (!body.password || !body.confirmPassword)
    throw new Error("Please filed password and confirm password");
  if (body.password !== body.confirmPassword)
    throw new Error("Password and confirm password not match !");
  if (!body.email) throw new Error("Please filled email ");
};

router.route("/").get((req, res) => {
  res.send("Hello from Node.js RESTful API");
});

router.route("/register").post(async (req, res) => {
  validateRegister(req.body);
  const { username, password, email } = req.body;
  const hashPassword = bcrypt.hashSync(password, SALT_WORK_FACTOR);
  const data = { username, email, password: hashPassword };
  const user = new UserModel(data);
  const _user = await user.save();
  return res.json({ success: true, data: _user });
});

const validateLogin = body => {
  if (!body.username || !body.password)
    throw new Error("Please filled username or password !");
};

router.route("/login").post(async (req, res) => {
  validateLogin(req.body);
  const { username, password } = req.body;
  const _user = await userService.getUserByUsername(username);

  if (_user) {
    if (bcryptUtils.comparePassword(password, _user.password)) {
      const _userInfo = await userService.getUserWithoutPassword(_user._id);

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
});

module.exports = router;
