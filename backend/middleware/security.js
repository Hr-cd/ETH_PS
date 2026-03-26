const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 100, // requests per IP

  message: {
    success: false,
    message:
      "Too many requests. Try again later."
  },

  standardHeaders: true,

  legacyHeaders: false
});

// CORS configuration
const corsOptions = {
  origin: "*", // change later in production
  methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE"
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ]
};

const securityMiddleware = [
  helmet(),
  cors(corsOptions),
  limiter
];

module.exports =
  securityMiddleware;