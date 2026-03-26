const Attempt = require("../models/Attempt");

exports.getStudentAnalytics = async (req, res) => {
  try {

    const userId =
      req.user.userId;

    // Total attempts

    const totalAttempts =
      await Attempt.countDocuments({
        userId
      });

    // Correct attempts

    const correctAttempts =
      await Attempt.countDocuments({
        userId,
        isCorrect: true
      });

    // Accuracy %

    const accuracy =
      totalAttempts === 0
        ? 0
        : (
            correctAttempts /
            totalAttempts
          ) * 100;

    // Average time

    const avgTimeResult =
      await Attempt.aggregate([
        {
          $match: {
            userId
          }
        },
        {
          $group: {
            _id: null,
            averageTime: {
              $avg: "$timeTaken"
            }
          }
        }
      ]);

    const averageTime =
      avgTimeResult.length
        ? avgTimeResult[0]
            .averageTime
        : 0;

    // Confusion breakdown

    const confusionStats =
      await Attempt.aggregate([
        {
          $match: {
            userId
          }
        },
        {
          $group: {
            _id:
              "$confusionType",
            count: {
              $sum: 1
            }
          }
        }
      ]);

    const formattedStats = {};

    confusionStats.forEach(
      item => {
        formattedStats[
          item._id
        ] = item.count;
      }
    );

    res.json({

      totalAttempts,

      correctAttempts,

      accuracy:
        Number(
          accuracy.toFixed(2)
        ),

      averageTime:
        Number(
          averageTime.toFixed(2)
        ),

      confusionStats:
        formattedStats

    });

  } catch (error) {

    console.error(
      "Analytics error:",
      error
    );

    res.status(500).json({
      message:
        "Analytics server error"
    });

  }
};