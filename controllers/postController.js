const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

// middleware
const createPost = async (req, res) => {
  try {
    const { title, description, password } = req.body;
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    return res.status(201).send({
      success: true,
      message: "Post Created SuccessFully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error is Create post Api",
      error,
    });
  }
};
const getAllPost = async (req, res) => {
  try {
    let post = await postModel
      .find({})
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Post Data",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error is get All post Api",
      error,
    });
  }
};

module.exports = { createPost, getAllPost };
