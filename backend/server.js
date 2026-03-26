const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = 3000;

require("dotenv").config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("AI Tutor Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});