const express = require("express");
const router = express.Router();

//service
const userService = require("../../../services/users");

// utils
const { FOLDER_PATH, convertB64toImage } = require("../../../utils/images");

router
  .route("")
  .get(async (req, res) => {
    const _user = await userService.getUserWithoutPassword(req.user._id);
    return res.json({ sucess: true, data: _user });
  })
  .put(async (req, res) => {
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

      const _user = await userService.updateUserData(req.user._id, data);
      return res.json({ sucess: true, data: _user });
    } catch (error) {
      return res.json({ sucess: false, error: true, message: error.message });
    }
  });

module.exports = router;
