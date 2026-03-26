const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const questionRoutes = require("./routes/questionRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const openai = require("./config/groqai");
const app = express();
const PORT = 3000;

require("dotenv").config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/questions",questionRoutes);
app.use("/api/attempts",attemptRoutes);
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