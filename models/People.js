// external imports
const mongoose = require("mongoose");

// model schema
const peopleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// model create
const People = mongoose.model("People", peopleSchema);

// export function
module.exports = People;
