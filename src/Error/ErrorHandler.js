import "express-async-errors";
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err) {
    console.log({ err });

    res.status(500).send({ err });
  }
  if (res.headersSent) {
    return next(err);
  }
};

export default errorHandlerMiddleware;
