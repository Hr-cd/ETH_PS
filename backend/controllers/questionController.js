const redisClient = require("../config/redis");
const Question = require("../models/Question");


// Create Question
exports.createQuestion = async (req, res) => {
  try {

    const {
      questionText,
      correctAnswer,
      topic,
      difficulty,
      explanation,
      imageUrl
    } = req.body;

    const question =
      await Question.create({

        questionText,
        correctAnswer,
        topic,
        difficulty,
        explanation,

        imageUrl:
          req.file
            ? req.file.path
            : imageUrl || null

      });

    await redisClient.del(
      "/api/questions"
    );

    res.status(201).json(question);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};



// Get All Questions
exports.getQuestions = async (req, res) => {
  try {
    const { topic, difficulty } = req.query;

    let filter = {};

    if (topic) {
      filter.topic = topic;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const questions = await Question.find(filter);

    res.json(questions);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};



// Get Single Question
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(
      req.params.id
    );

    if (!question) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    res.json(question);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};