const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlacklistedToken");


// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.logoutUser =
  async (req, res) => {

    try {

      const token =
        req.header(
          "Authorization"
        )?.split(" ")[1];

      if (!token) {
        return res.status(400).json({
          message:
            "Token missing"
        });
      }

      const decoded =
        jwt.decode(token);

      await BlacklistedToken.create({

        token,

        expiresAt:
          new Date(
            decoded.exp * 1000
          )

      });

      res.json({
        message:
          "Logged out successfully"
      });

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

      res.status(500).json({
        message:
          "Logout failed"
      });

    }

  };