const bcrypt = require('bcryptjs');
const prisma = require('../config/db');
const jwtUtil = require('../utils/jwt');
const ApiError = require('../utils/ApiError');

const login = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new ApiError(401, 'Invalid credentials. Account locked after 5 failed attempts.');
  }

  if (!user.isActive) {
    throw new ApiError(401, 'User account is inactive');
  }

  // Check if account is locked
  if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
    throw new ApiError(401, 'Account locked due to 5 failed attempts. Please try again later.');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const newAttempts = user.failedLoginAttempts + 1;
    if (newAttempts >= 5) {
      const lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      await prisma.$executeRaw`
        UPDATE public.profiles
        SET failed_login_attempts = 0,
            locked_until = ${lockedUntil}
        WHERE id = ${user.id}::uuid
      `;
      throw new ApiError(401, 'Account locked due to 5 failed attempts. Please try again later.');
    } else {
      await prisma.$executeRaw`
        UPDATE public.profiles
        SET failed_login_attempts = ${newAttempts}
        WHERE id = ${user.id}::uuid
      `;
      throw new ApiError(401, 'Invalid credentials. Account locked after 5 failed attempts.');
    }
  }

  // Reset failed login attempts on success
  await prisma.$executeRaw`
    UPDATE public.profiles
    SET failed_login_attempts = 0,
        locked_until = NULL
    WHERE id = ${user.id}::uuid
  `;

  const accessToken = jwtUtil.generateToken({
    sub: user.id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
  };
};

module.exports = {
  login,
};
