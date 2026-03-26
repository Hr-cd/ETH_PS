const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true
    },

    correctAnswer: {
      type: String,
      required: true
    },

    topic: {
      type: String,
      required: true
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy"
    },

    explanation: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Question",
  questionSchema
);