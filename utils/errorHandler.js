const { isCelebrateError } = require('celebrate');

const errorHandler = (err, _req, res, _next) => {

  if (isCelebrateError(err)) {
    console.error("Validation error:", err);
  return res.status(400).send({
    message: "Validation error occurred"
  })
}

  const statusCode = err.statusCode || err.status || 500;
  const message = statusCode === 500 ? "An internal server error occurred" : err.message;
  res.status(statusCode).send({ message });
};

module.exports = errorHandler;