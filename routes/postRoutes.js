const express = require("express");

const router = express.Router();

const { createPost } = require("../controllers/postController");
const { requireSignIn } = require("../controllers/userController");
router.post("/createPost", requireSignIn, createPost);

module.exports = router;
