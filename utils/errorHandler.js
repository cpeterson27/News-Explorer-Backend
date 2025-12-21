const errorHandler = (err, _req, res, _next) => {

  const statusCode = err.statusCode || err.status || 500;
  const message = statusCode === 500 ? "An internal server error occurred" : err.message;
  res.status(statusCode).send({ message });
};

module.exports = errorHandler;