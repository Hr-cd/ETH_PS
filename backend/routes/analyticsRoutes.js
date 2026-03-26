const express = require("express");

const router =
  express.Router();

const {
  getStudentAnalytics
} = require(
  "../controllers/analyticsController"
);

const auth =
  require(
    "../middleware/authMiddleware"
  );

router.get(
  "/student",
  auth,
  getStudentAnalytics
);

module.exports = router;