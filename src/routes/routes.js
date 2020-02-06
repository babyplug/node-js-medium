const router = require("express").Router();

// services
const userService = require("../services/users");

router.route("/").get((req, res) => {
  res.send("Hello from Node.js RESTful API");
});

router.route("/register").post(userService.register());

router.route("/login").post(userService.login());

module.exports = router;
