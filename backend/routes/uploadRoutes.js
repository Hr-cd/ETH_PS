const express = require("express");

const router =
  express.Router();

const upload =
  require(
    "../config/upload"
  );

const protect =
  require(
    "../middleware/authMiddleware"
  );

router.post(

  "/question-image",

  protect,

  upload.single(
    "questionImage"
  ),

  (req, res) => {

    res.json({

      message:
        "File uploaded",

      file: req.file

    });

  }

);

module.exports = router;