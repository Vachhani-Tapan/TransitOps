const ApiError = require('../utils/ApiError');
const jwtUtil = require('../utils/jwt');
const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Please authenticate: JWT token is missing');
  }

  const token = authHeader.split(' ')[1];
  let decoded;

  try {
    decoded = jwtUtil.verifyToken(token);
  } catch (error) {
    throw new ApiError(401, error.message || 'JWT authentication failed');
  }

  if (!decoded || !decoded.sub) {
    throw new ApiError(401, 'JWT authentication failed: Invalid payload');
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.sub },
  });

  if (!user) {
    throw new ApiError(401, 'User account no longer exists');
  }

  if (!user.isActive) {
    throw new ApiError(401, 'User account is inactive');
  }

  // Attach safe user object to request
  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  };

  next();
});

module.exports = authenticate;
