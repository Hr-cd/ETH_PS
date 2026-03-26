const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlacklistedToken");

const protect = async (
  req,
  res,
  next
) => {

  try {

    let token;

    // Extract token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];

    }

    // 1) Token must exist

    if (!token) {
      return res.status(401).json({
        message:
          "No token provided"
      });
    }

    // 2) Check blacklist

    const blacklisted =
      await BlacklistedToken.findOne({
        token
      });

    if (blacklisted) {
      return res.status(401).json({
        message:
          "Token has been logged out"
      });
    }

    // 3) Verify JWT

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.user =
      decoded;

    next();

  } catch (error) {

    console.error(
      "Auth error:",
      error.message
    );

    return res.status(401).json({
      message:
        "Invalid or expired token"
    });

  }

};

module.exports = protect;