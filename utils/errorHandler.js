const { isCelebrateError } = require('celebrate');

const errorHandler = (err, _req, res, _next) => {
  // Handle Celebrate validation errors
  if (isCelebrateError(err)) {
    console.error("Celebrate validation error:", err);

    // Extract the actual validation message from Joi
    const errorBody = err.details.get('body');
    const errorParams = err.details.get('params');

    const validation = errorBody || errorParams;

    if (validation) {
      const { details } = validation;
      const message = details[0].message;

      return res.status(400).send({
        message
      });
    }

    return res.status(400).send({
      message: "Validation error occurred"
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = statusCode === 500 ? "An internal server error occurred" : err.message;
  res.status(statusCode).send({ message });
};

module.exports = errorHandler;