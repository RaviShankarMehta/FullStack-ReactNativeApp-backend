const express = require("express");

const router = express.Router();

const { createPost, getAllPost } = require("../controllers/postController");
const { requireSignIn } = require("../controllers/userController");
router.post("/createPost", requireSignIn, createPost);
router.get("/getAllPost", getAllPost);

module.exports = router;
