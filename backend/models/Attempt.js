const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },

    studentAnswer: {
      type: String,
      required: true
    },

    steps: {
      type: [String],
      default: []
    },

    timeTaken: {
      type: Number
    },

    isCorrect: {
      type: Boolean
    },

    confusionType: {
      type: String,
      enum: [
        "Conceptual",
        "Procedural",
        "Careless",
        "Prerequisite",
        "None"
      ],
      default: "None"
    },

    reason: {
      type: String,
      default: "No confusion detected."
    },

    feedback: {
      type: String,
      default: "Correct response."
    },
    
    analysisStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "failed"
      ],
      default: "pending"
    },

    jobId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Attempt",
  attemptSchema
);