const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required "],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email Id required "],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password required "],
      min: 6,
      max: 64,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
