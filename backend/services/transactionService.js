const {
  getAllTransactions,
  getTransactionStatistics,
  getTransactionBarChart,
  getTransactionPieChart,
} = require('../repositories/transactionRepository');

const fetchAllTransactions = async (month, page, perPage, search) => {
  return await getAllTransactions(month, page, perPage, search);
};

const fetchTransactionStatistics = async (month) => {
  return await getTransactionStatistics(month);
};

const fetchTransactionBarChart = async (month) => {
  return await getTransactionBarChart(month);
};

const fetchTransactionPieChart = async (month) => {
  return await getTransactionPieChart(month);
};

module.exports = {
  fetchAllTransactions,
  fetchTransactionStatistics,
  fetchTransactionBarChart,
  fetchTransactionPieChart,
};
