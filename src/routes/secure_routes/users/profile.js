const router = require("express").Router();

//service
const userService = require("../../../services/users");

router
  .route("")
  .get(userService.getProfile())
  .put(userService.updateUserData());

module.exports = router;
