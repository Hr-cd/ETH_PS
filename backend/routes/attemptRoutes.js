const express = require("express");
const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  submitAttempt,
  getAttemptsByUser
} = require(
  "../controllers/attemptController"
);


// Submit Answer
router.post(
  "/",
  protect,
  submitAttempt
);


// Get Attempt History
router.get(
  "/",
  protect,
  getAttemptsByUser
);

module.exports = router;