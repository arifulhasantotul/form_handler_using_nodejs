// external imports

// internal imports
const cloudinary = require("../config/cloudinary");
const User = require("../models/People");

// get user function
async function getUsers(req, res, next) {
  try {
    const allUsers = await User.find();
    res.render("users", {
      users: allUsers,
    });
  } catch (err) {
    console.log(err);
  }
}

// add user function
async function addUser(req, res, next) {
  try {
    const result = await cloudinary.uploader.upload(req.files[0].path, {
      width: 200,
      height: 200,
      crop: "thumb",
      gravity: "face",
    });

    // console.log(result);

    // create instance of user
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });

    // save user to db
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
}

// update user function
async function updateUser(req, res, next) {
  try {
    let user = await User.findById(req.params.id);
    await cloudinary.uploader.destroy(user.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      name: req.body.name || user.name,
      avatar: result.secure_url || user.avatar,
      cloudinary_id: result.public_id || user.cloudinary_id,
    };

    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
}

// delete user function
async function deleteUser(req, res, next) {
  try {
    // find user by id
    const user = await User.findById(req.params.id);
    // delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
}

// export function
module.exports = { addUser, getUsers, deleteUser, updateUser };
