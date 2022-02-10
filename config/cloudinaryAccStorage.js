const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const accountStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Try folder",
  },
});

module.exports = accountStorage;
