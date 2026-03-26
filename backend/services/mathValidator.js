const math = require("mathjs");

const validateAnswer = (steps, studentAnswer) => {
  try {

    const lastStep =
      steps[steps.length - 1];

    const result =
      lastStep.split("=")[1].trim();

    const evaluated =
      math.evaluate(result);

    const answerValue =
      studentAnswer
        .split("=")[1]
        .trim();

    return (
      Number(answerValue) ===
      Number(evaluated)
    );

  } catch (error) {

    console.error(
      "Validation error:",
      error.message
    );

    return false;

  }
};

module.exports = validateAnswer;