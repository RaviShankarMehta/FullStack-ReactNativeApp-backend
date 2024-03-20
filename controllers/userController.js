const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email Id is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and mim 6 character length",
      });
    }
    // existing user check
    const existingUser = await userModel.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User Already Register With This Email",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    return res.status(201).send({
      success: true,
      message: "Registration SuccessFull Please login",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error is Register Api",
      error,
    });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (password && password.length < 6) {
      return res.status(500).send({
        success: false,
        message: "Please is required and password should be 6 character long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // updated user
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { name: name || user.name, password: hashedPassword || user.password },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "update successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in update api",
      error,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide Email or Password",
      });
    }
    const user = await userModel.findOne({ email });
    // undefined password
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Jwt token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login api",
      error,
    });
  }
};

module.exports = { register, login, update };
