const express = require("express");

const router = express.Router();

const {
  createPost,
  getAllPost,
  getUserPost,
} = require("../controllers/postController");
const { requireSignIn } = require("../controllers/userController");
router.post("/createPost", requireSignIn, createPost);
router.get("/getAllPost", getAllPost);
router.get("/getUserPost", requireSignIn, getUserPost);

module.exports = router;
