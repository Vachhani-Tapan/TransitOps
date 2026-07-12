const dashboardService = require('../services/dashboard.service');

const getOverview = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    const data = await dashboardService.getOverviewData(id, role);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview,
};
