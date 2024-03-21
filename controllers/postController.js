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
    let posts = await postModel
      .find({})
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Post Data",
      posts,
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

const getUserPost = async (req, res) => {
  try {
    let userPosts = await postModel
      .find({ postedBy: req.auth._id })
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Post Data",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error is get User post Api",
      error,
    });
  }
};
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error is delete post Api",
      error,
    });
  }
};
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const post = await postModel.findById({ _id: id });
    if (!title || !description) {
      res.status(200).send({
        success: true,
        message: "Please provide post title or description",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post Update Successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error is update post Api",
      error,
    });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getUserPost,
  deletePost,
  updatePost,
};
