const express = require("express");
const router = express.Router();

const permission = require("../../../plugins/permission");

router.use(permission(["admin", "super_admin"]));

router.route("").get(async (req, res) => {
  return res.send("Hello from users routes with admin permission");
});

module.exports = router;
