const express = require("express");
const router = express.Router();

//service
const userService = require("../../../services/users");

router.route("").get(async (req, res) => {
  const _user = await userService.getUserWithoutPassword(req.user._id);
  return res.json({ sucess: true, data: _user });
});

module.exports = router;
