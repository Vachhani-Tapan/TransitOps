const { z } = require('zod');
const ApiError = require('../utils/ApiError');

const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  })
  .email('Invalid email address format')
  .max(255, 'Email cannot exceed 255 characters')
  .trim()
  .toLowerCase(),
  
  password: z.string({
    required_error: 'Password is required',
  })
  .min(1, 'Password cannot be empty')
  .max(100, 'Password cannot exceed 100 characters'),
});

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errorMap = {};
    result.error.errors.forEach((err) => {
      const field = err.path.join('.');
      errorMap[field] = err.message;
    });
    return next(new ApiError(400, 'Validation failed', errorMap));
  }
  
  // Replace request body with parsed and cleaned values
  req.body = result.data;
  next();
};

module.exports = {
  loginSchema,
  validate,
};
