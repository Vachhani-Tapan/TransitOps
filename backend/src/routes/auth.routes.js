const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authenticate = require('../middleware/authenticate');
const { loginRateLimiter } = require('../middleware/rateLimiter');
const { loginSchema, validate } = require('../validators/auth.validator');

router.post('/auth/login', loginRateLimiter, validate(loginSchema), authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authenticate, authController.me);

module.exports = router;
