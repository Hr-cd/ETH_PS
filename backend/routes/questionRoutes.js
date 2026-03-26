const express = require("express");
const router = express.Router();

const {
  createQuestion,
  getQuestions,
  getQuestionById
} = require("../controllers/questionController");

const protect = require(
  "../middleware/authMiddleware"
);



// Create Question
router.post(
  "/",
  protect,
  createQuestion
);



// Get Questions
router.get(
  "/",
  protect,
  getQuestions
);



// Get Single Question
router.get(
  "/:id",
  protect,
  getQuestionById
);

module.exports = router;