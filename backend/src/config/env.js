const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the backend root folder
dotenv.config({ path: path.join(__dirname, '../../.env') });

const requiredEnv = ['DATABASE_URL', 'JWT_ACCESS_SECRET'];

if (process.env.NODE_ENV !== 'test') {
  for (const envVar of requiredEnv) {
    if (!process.env[envVar]) {
      console.error(`[CRITICAL] Missing required environment variable: ${envVar}`);
      process.exit(1);
    }
  }
}

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'fallback-secret-for-testing-only',
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};
