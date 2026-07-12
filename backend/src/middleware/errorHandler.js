const env = require('../config/env');

const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  // Handle non-operational errors by masking them in production
  if (env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = 500;
    message = 'An unexpected error occurred on the server';
  }

  const response = {
    success: false,
    message,
    ...(err.errors && { errors: err.errors }),
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
