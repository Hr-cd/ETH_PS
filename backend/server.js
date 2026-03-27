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
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("mongo-sanitize");
// const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const {createBullBoard} = require("@bull-board/api");
const {BullMQAdapter} = require("@bull-board/api/bullMQAdapter");
const {ExpressAdapter} = require("@bull-board/express");
const {confusionQueue} = require("./config/queue");
const uploadRoutes =require("./routes/uploadRoutes");
const app = express();
const PORT = 3000;

require("dotenv").config();
connectDB();
const limiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 100,

  message: {
    message:
      "Too many requests, try again later"
  }

});

app.use("/api", limiter);
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
app.use(cors({
    origin:
      "http://localhost:5173",
    credentials: true
  }));
app.use(helmet());

app.use((req, res, next) => {
  req.body = mongoSanitize(req.body);
  req.params = mongoSanitize(req.params);
  req.query = mongoSanitize(req.query);
  next();
});
app.use(hpp());
app.use(
  express.json({
    limit: "10kb"
  })
);
app.use(
  "/uploads",
  require("express")
    .static("uploads")
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
app.use("/api/upload",uploadRoutes);
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