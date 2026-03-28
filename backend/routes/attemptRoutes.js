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
  getAttemptStatus
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
  getAttemptsByUser
);

router.get(
  "/:id/status",
  protect,
  getAttemptStatus
);

module.exports = router;