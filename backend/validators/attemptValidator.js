const { body } =
  require("express-validator");

exports.submitAttemptRules = [

  body("questionId")
    .notEmpty()
    .withMessage(
      "Question ID is required"
    ),

  body("studentAnswer")
    .isString()
    .withMessage(
      "Student answer must be a string"
    ),

  body("steps")
    .isArray()
    .withMessage(
      "Steps must be an array"
    ),

  body("timeTaken")
    .isNumeric()
    .withMessage(
      "Time must be numeric"
    )
    .custom(value => {
      if (value <= 0) {
        throw new Error(
          "Time must be positive"
        );
      }
      return true;
    })

];