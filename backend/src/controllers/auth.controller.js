const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  res.status(200).json({
    success: true,
    message: 'Authentication successful',
    data: result,
  });
});

const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful. Client must discard access token.',
  });
});

module.exports = {
  login,
  me,
  logout,
};
