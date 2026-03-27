const express = require("express");
const router = express.Router();
const loginLimiter = require("../middleware/loginLimiter");

const {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");


router.post("/register", registerUser);

router.post("/login", loginUser, loginLimiter);

router.post("/logout", protect, logoutUser);

router.delete("/users/:id",protect,
  authorize(
    "admin"
  ),
  deleteUser
);

module.exports = router;