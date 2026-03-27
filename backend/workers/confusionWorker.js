const { Worker } =
  require("bullmq");

const analyzeConfusion =
  require(
    "../services/analyzeConfusion"
  );

  const Attempt =
  require(
    "../models/Attempt"
  );

const connection = {
  host: "127.0.0.1",
  port: 6379
};

const worker =
  new Worker(
    "confusion-analysis",

    async job => {

      const {
        attemptId,
        questionText,
        correctAnswer,
        studentAnswer,
        steps
      } = job.data;

      await Attempt.findByIdAndUpdate(
        attemptId,
        {
          analysisStatus:
            "processing"
        }
      );

      try {

        const result =
          await analyzeConfusion(
            questionText,
            correctAnswer,
            studentAnswer,
            steps
          );

        await Attempt.findByIdAndUpdate(
          attemptId,
          {
            confusionType:
              result.confusionType,

            reason:
              result.reason,

            feedback:
              result.feedback,

            analysisStatus:
              "completed"
          }
        );

      } catch (error) {

        await Attempt.findByIdAndUpdate(
          attemptId,
          {
            analysisStatus:
              "failed"
          }
        );

        throw error;

      }

    },

    { connection }

  );

worker.on(
  "completed",
  job => {
    console.log(
      `Job ${job.id} completed`
    );
  }
);

worker.on(
  "failed",
  (job, err) => {
    console.error(
      `Job ${job.id} failed:`,
      err.message
    );
  }
);