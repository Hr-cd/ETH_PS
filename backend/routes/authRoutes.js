const express = require("express");
const router = express.Router();
const loginLimiter = require("../middleware/loginLimiter");

const {
  registerUser,
  loginUser,
  logoutUser
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");


router.post("/register", registerUser);

router.post("/login", loginUser, loginLimiter);

router.post("/logout", protect, logoutUser);

module.exports = router;