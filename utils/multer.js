// external imports
const multer = require("multer");
const path = require("path");
const accountStorage = require("../config/cloudinaryAccStorage");

// uploader
const upload = multer({
  storage: accountStorage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    } else {
      cb(null, true);
    }
  },
});

module.exports = upload;
