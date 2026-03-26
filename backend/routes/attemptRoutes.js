const express = require("express");
const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const validateRequest =
  require(
    "../middleware/validateRequest"
  );

const {
  submitAttemptRules
} = require(
  "../validators/attemptValidator"
);
  
const {
  submitAttempt,
  getAttemptsByUser,
  getUserAttempts
} = require(
  "../controllers/attemptController"
);


// Submit Answer
router.post(
  "/",
  protect,
  submitAttemptRules,
  validateRequest,
  submitAttempt
);


// Get Attempt History
router.get(
  "/",
  protect,
  getAttemptsByUser,
  getUserAttempts
);

module.exports = router;