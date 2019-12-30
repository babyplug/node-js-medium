const uuidv4 = require("uuid/v4");
const base64Img = require("base64-img");

// config
const config = require("../../config/config");

const baseURI = `http://localhost:${config.port}/images/`;
const FOLDER_PATH = {
  USER: "users"
};

const convertB64toImage = async (fileName, image, dest) => {
  try {
    _uuid = uuidv4();
    _image = image;
    const type = fileType(fileName);
    const physicalPath = base64Img.imgSync(
      image,
      `public/images/${dest}`,
      _uuid
    );

    imgPath = baseURI.concat(`${dest}/${_uuid}.${type}`);
    return imgPath;
  } catch (error) {
    return error;
  }
};

const fileType = fileName => {
  let splitFileName = fileName.split(".");
  return splitFileName[splitFileName.length - 1];
};

module.exports = {
  convertB64toImage,
  FOLDER_PATH
};
