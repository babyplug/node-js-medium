const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");
const SALT_WORK_FACTOR = 10;

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

module.exports = router;
