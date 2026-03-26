const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const app = express();
const PORT = 3000;

require("dotenv").config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
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