const express = require("express");

const router = express.Router();

const {
  register,
  login,
  update,
  requireSignIn,
} = require("../controllers/userController");
router.post("/register", register);
router.post("/login", login);
router.put("/update", requireSignIn, update);

module.exports = router;
