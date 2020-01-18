const express = require("express");
const router = express.Router();

//route
const profile = require("./users/profile");
const books = require("./books/book");
const user = require("./users/user");

router.use("/profile", profile);
router.use("/books", books);
router.use("/users", user);

router.route("").get((req, res) => {
  return res.send("Welcome to auth routes");
});

module.exports = router;
