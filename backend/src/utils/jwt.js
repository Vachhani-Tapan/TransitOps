const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('JWT token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('JWT token is malformed');
    }
    throw error;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
