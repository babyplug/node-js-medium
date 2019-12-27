const express = require("express");
const router = express.Router();

//route
const profile = require("./users/profile");

router.use("/profile", profile);

router.route("").get((req, res) => {
  return res.send("Welcome to auth routes");
});

module.exports = router;
