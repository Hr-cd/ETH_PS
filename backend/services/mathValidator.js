const math = require("mathjs");

const validateAnswer = (steps, studentAnswer) => {
  try {
    if (!steps || steps.length === 0) return false;
    if (!studentAnswer) return false;

    const lastStep = steps[steps.length - 1];
    
    // Extract the final numeric expression from the last step
    const resultToEvaluate = lastStep.includes("=") 
      ? lastStep.split("=")[1].trim() 
      : lastStep.trim();

    const evaluated = math.evaluate(resultToEvaluate);

    // Extract the provided answer to check
    const answerValueStr = studentAnswer.includes("=") 
      ? studentAnswer.split("=")[1].trim() 
      : studentAnswer.trim();

    let expectedValue = Number(evaluated);
    let semanticAnswerValue;

    // Evaluate the student answer in case they wrote an expression like "10/2"
    try {
      semanticAnswerValue = Number(math.evaluate(answerValueStr));
    } catch {
      semanticAnswerValue = Number(answerValueStr);
    }

    if (isNaN(semanticAnswerValue) || isNaN(expectedValue)) {
      // Fallback to direct string comparison for non-numeric answers
      return answerValueStr.toLowerCase() === resultToEvaluate.toLowerCase();
    }

    // Floating point comparison
    return Math.abs(semanticAnswerValue - expectedValue) < 0.0001;

  } catch (error) {
    console.error("Validation error:", error.message);
    return false;
  }
};

module.exports = validateAnswer;