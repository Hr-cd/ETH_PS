const redisClient =
  require("../config/redis");

const cache =
  (duration) => {

    return async (
      req,
      res,
      next
    ) => {

      try {

        const key = `cache:${req.originalUrl}`;

        const cachedData =
          await redisClient.get(
            key
          );

        if (cachedData) {

          return res.json(
            JSON.parse(
              cachedData
            )
          );

        }

        const originalJson =
          res.json.bind(res);

        res.json =
          async (data) => {

            await redisClient.setEx(
              key,
              duration,
              JSON.stringify(data)
            );

            return originalJson(
              data
            );

          };

        next();

      } catch (error) {

        console.error(
          "Cache error:",
          error.message
        );

        next();

      }

    };

  };

module.exports =
  cache;