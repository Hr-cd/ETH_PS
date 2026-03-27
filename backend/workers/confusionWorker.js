const { Worker } =
  require("bullmq");

const analyzeConfusion =
  require(
    "../services/analyzeConfusion"
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
        questionText,
        correctAnswer,
        studentAnswer,
        steps
      } = job.data;

      const result =
        await analyzeConfusion(
          questionText,
          correctAnswer,
          studentAnswer,
          steps
        );

      return result;

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