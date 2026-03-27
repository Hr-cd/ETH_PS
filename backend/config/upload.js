const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure directory exists
const createFolder = folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, {
      recursive: true
    });
  }
};

createFolder("uploads/questions");
createFolder("uploads/profiles");
createFolder("uploads/documents");

const storage =
  multer.diskStorage({

    destination: (
      req,
      file,
      cb
    ) => {

      if (
        file.fieldname ===
        "profile"
      ) {
        cb(
          null,
          "uploads/profiles"
        );
      }

      else if (
        file.fieldname ===
        "questionImage"
      ) {
        cb(
          null,
          "uploads/questions"
        );
      }

      else {
        cb(
          null,
          "uploads/documents"
        );
      }

    },

    filename: (
      req,
      file,
      cb
    ) => {

      const uniqueName =
        Date.now() +
        "-" +
        file.originalname;

      cb(
        null,
        uniqueName
      );

    }

  });

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf"
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  }

  else {
    cb(
      new Error(
        "Invalid file type"
      ),
      false
    );
  }

};

const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize:
      5 * 1024 * 1024
  }

});

module.exports = upload;