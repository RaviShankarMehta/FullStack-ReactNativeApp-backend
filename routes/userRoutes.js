const express = require("express");

const router = express.Router();

const { register, login, update } = require("../controllers/userController");
router.post("/register", register);
router.post("/login", login);
router.put("/update", update);

module.exports = router;
