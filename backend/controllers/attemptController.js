const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
// const analyzeConfusion = require("../services/aiService");
const validateAnswer = require("../services/mathValidator");
const {confusionQueue} = require("../config/queue");


// Submit Answer
exports.submitAttempt = async (req, res) => {
  try {

    const {
      questionId,
      studentAnswer,
      steps,
      timeTaken
    } = req.body;

    const userId =
      req.user.userId;

    // 1 — Get question
    const question =
      await Question.findById(
        questionId
      );

    if (!question) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    // 2 — Validate answer
    const isCorrect =
      validateAnswer(
        steps,
        studentAnswer
      );

    let confusionType =
      null;

    let reason =
      null;

    let feedback =
      null;

    // 3 — Create attempt FIRST
    const attempt =
      await Attempt.create({

        userId,
        questionId,

        studentAnswer,
        steps,
        timeTaken,

        isCorrect,

        confusionType:
          isCorrect
            ? "None"
            : null,

        reason:
          isCorrect
            ? "Student solved correctly."
            : null,

        feedback:
          isCorrect
            ? "Correct solution."
            : null,

        analysisStatus:
          isCorrect
            ? "completed"
            : "pending"

      });

    // 4 — If wrong → queue analysis
    if (!isCorrect) {

      const job =
        await confusionQueue.add(
          "analyze",
          {
            attemptId:
              attempt._id,

            questionText:
              question.questionText,

            correctAnswer:
              question.correctAnswer,

            studentAnswer,

            steps
          },
          {
            attempts: 3,
            backoff: 5000
          }
        );

      // Save job id
      attempt.jobId =
        job.id;

      await attempt.save();

    }

    res.status(201).json(
      attempt
    );

  }

  catch (error) {

    console.error(
      "FULL ERROR:"
    );

    console.error(
      error
    );

    res.status(500).json({
      message:
        error.message,
      stack:
        error.stack
    });

  }

};

exports.getAttemptStatus =
  async (req, res) => {

    const attempt =
      await Attempt.findById(
        req.params.id
      );

    if (!attempt) {

      return res.status(404)
        .json({
          message:
            "Attempt not found"
        });

    }

    res.json({

      status:
        attempt.analysisStatus,

      confusionType:
        attempt.confusionType,

      reason:
        attempt.reason,

      feedback:
        attempt.feedback

    });

  };

// Get Student Attempts
exports.getAttemptsByUser = async (
  req,
  res
) => {
  try {
    const attempts = await Attempt.find({
      userId: req.user.userId
    })
      .populate("questionId")
      .sort({ createdAt: -1 });

    res.json(attempts);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// exports.getUserAttempts = async (req, res) => {
//   try {

//     const userId =
//       req.user.userId;

//     const page =
//       parseInt(req.query.page) || 1;

//     const limit =
//       parseInt(req.query.limit) || 10;

//     const skip =
//       (page - 1) * limit;

//     const total =
//       await Attempt.countDocuments({
//         userId
//       });

//     const attempts =
//       await Attempt
//         .find({ userId })
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit);

//     res.json({

//       total,

//       page,

//       pages:
//         Math.ceil(total / limit),

//       data:
//         attempts

//     });

//   } catch (error) {

//     console.error(
//       "Fetch attempts error:",
//       error
//     );

//     res.status(500).json({
//       message:
//         "Server error"
//     });

//   }
// };