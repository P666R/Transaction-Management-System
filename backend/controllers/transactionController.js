const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');

const {
  fetchAllTransactions,
  fetchTransactionStatistics,
  fetchTransactionBarChart,
  fetchTransactionPieChart,
} = require('../services/transactionService');

const getTransactions = asyncHandler(async (req, res, next) => {
  const { month = 3, page = 1, perPage = 10, search = '' } = req.query;

  if (month < 1 || month > 12) {
    return next(new AppError('Month must be between 1 and 12', 400));
  }

  const transactions = await fetchAllTransactions(month, page, perPage, search);

  res.status(200).json({
    status: 'success',
    transactions,
  });
});

const getTransactionStatistics = asyncHandler(async (req, res, next) => {
  const { month } = req.query;

  if (month < 1 || month > 12) {
    return next(new AppError('Month must be between 1 and 12', 400));
  }

  const statistics = await fetchTransactionStatistics(month);
  res.status(200).json({
    status: 'success',
    statistics,
  });
});

const getTransactionBarChart = asyncHandler(async (req, res, next) => {
  const { month } = req.query;

  if (month < 1 || month > 12) {
    return next(new AppError('Month must be between 1 and 12', 400));
  }

  const barChartData = await fetchTransactionBarChart(month);
  res.status(200).json({
    status: 'success',
    barChartData,
  });
});

const getTransactionPieChart = asyncHandler(async (req, res, next) => {
  const { month } = req.query;

  if (month < 1 || month > 12) {
    return next(new AppError('Month must be between 1 and 12', 400));
  }

  const pieChartData = await fetchTransactionPieChart(month);
  res.status(200).json({
    status: 'success',
    pieChartData,
  });
});

const getCombinedData = asyncHandler(async (req, res, next) => {
  const { month } = req.query;

  if (month < 1 || month > 12) {
    return next(new AppError('Month must be between 1 and 12', 400));
  }

  const [statistics, barChartData, pieChartData] = await Promise.all([
    fetchTransactionStatistics(month),
    fetchTransactionBarChart(month),
    fetchTransactionPieChart(month),
  ]);

  res
    .status(200)
    .json({ status: 'success', statistics, barChartData, pieChartData });
});

module.exports = {
  getTransactions,
  getTransactionStatistics,
  getTransactionBarChart,
  getTransactionPieChart,
  getCombinedData,
};
