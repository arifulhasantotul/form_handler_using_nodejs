// external imports
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// internal imports
const userRouter = require("./router/userRouter");

// initialization
const app = express();
const port = process.env.PORT || 5000;

// mongoose connection
mongoose
  .connect(process.env.MONGOS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose cloudinary connection successful!"))
  .catch((err) => console.log(err));

// middleware parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// router setup
app.use("/users", userRouter);

// listening server
app.listen(port, () => {
  console.log("Cloudinary image upload server running on", port);
});
