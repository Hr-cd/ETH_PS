const errorHandler =
  (err, req, res, next) => {

    console.error(
      "GLOBAL ERROR:",
      err
    );

    res.status(
      err.status || 500
    ).json({

      success: false,

      message:
        err.message ||
        "Server error"

    });

  };

module.exports =
  errorHandler;