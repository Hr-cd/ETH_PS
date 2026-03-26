const express = require("express");
const router = express.Router();
const ROLES = require("../config/roles")

const {
  createQuestion,
  getQuestions,
  getQuestionById
} = require("../controllers/questionController");

const protect = require(
  "../middleware/authMiddleware"
);

const cache =
  require(
    "../middleware/cacheMiddleware"
  );

const authorize =require("../middleware/roleMiddleware");

// Create Question
router.post(
  "/",
  protect,
  authorize(ROLES.ADMIN),
  createQuestion
);



// Get Questions
router.get(
  "/",
  protect,
  cache(300),
  getQuestions
);



// Get Single Question
router.get(
  "/:id",
  protect,
  getQuestionById
);

module.exports = router;