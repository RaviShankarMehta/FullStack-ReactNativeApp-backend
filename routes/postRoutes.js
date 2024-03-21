const express = require("express");

const router = express.Router();

const {
  createPost,
  getAllPost,
  getUserPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { requireSignIn } = require("../controllers/userController");
router.post("/createPost", requireSignIn, createPost);
router.get("/getAllPost", getAllPost);
router.get("/getUserPosts", requireSignIn, getUserPost);
router.put("/updatePost/:id", requireSignIn, updatePost);
router.delete("/deletePost/:id", requireSignIn, deletePost);

module.exports = router;
