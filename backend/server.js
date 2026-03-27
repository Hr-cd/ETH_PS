const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const questionRoutes = require("./routes/questionRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const errorHandler = require("./middleware/errorHandler");
const securityMiddleware = require("./middleware/security");
const logger = require("./utils/logger");
const {createBullBoard} = require("@bull-board/api");
const {BullMQAdapter} = require("@bull-board/api/bullMQAdapter");
const {ExpressAdapter} = require("@bull-board/express");
const {confusionQueue} = require("./config/queue");
const app = express();
const PORT = 3000;

require("dotenv").config();
connectDB();
const serverAdapter =
  new ExpressAdapter();

serverAdapter.setBasePath(
  "/admin/queues"
);

createBullBoard({

  queues: [
    new BullMQAdapter(
      confusionQueue
    )
  ],

  serverAdapter

});
  
// Middleware
app.use(cors());
app.use(
  express.json({
    limit: "10kb"
  })
);
app.use(
  morgan("combined", {

    stream: {
      write: message =>
        logger.info(
          message.trim()
        )
    }

  })
);
app.use(errorHandler);
app.use(securityMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/questions",questionRoutes);
app.use("/api/attempts",attemptRoutes);
app.use("/api/analytics",analyticsRoutes);
app.use(
  "/admin/queues",
  serverAdapter.getRouter()
);
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("AI Tutor Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});