const express = require("express");
const router = express.Router();

//route
const profile = require("./users/profile");
const books = require("./books/book");

router.use("/profile", profile);
router.use("/books", books);

router.route("").get((req, res) => {
  return res.send("Welcome to auth routes");
});

module.exports = router;
