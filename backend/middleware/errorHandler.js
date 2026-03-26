const logger =
  require("../utils/logger");

const errorHandler =
  (
    err,
    req,
    res,
    next
  ) => {

    logger.error(

      `${req.method} ${req.originalUrl} - ${err.message}`

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