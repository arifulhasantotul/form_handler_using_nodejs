// external imports
const express = require("express");
const router = express.Router();

// internal imports
const upload = require("../utils/multer");
const {
  addUser,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controller/userController");
const decorateHTMLResponse = require("../middleware/common/decorateHTMLResponse");
const avatarUpload = require("../middleware/users/avatarUpload");

// GET: users
router.get("/", decorateHTMLResponse("Users"), getUsers);

// POST: image and user
// router.post("/", upload.single("avatar"), addUser);
router.post("/", avatarUpload, addUser);

// PUT: image and user
router.put("/:id", upload.single("avatar"), updateUser);

// DELETE: image and user
router.delete("/:id", deleteUser);

// export function
module.exports = router;
