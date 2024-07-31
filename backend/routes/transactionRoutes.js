const express = require('express');

const {
  getTransactions,
  getTransactionStatistics,
  getTransactionBarChart,
  getTransactionPieChart,
  getCombinedData,
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/', getTransactions);
router.get('/statistics', getTransactionStatistics);
router.get('/barchart', getTransactionBarChart);
router.get('/piechart', getTransactionPieChart);
router.get('/combined', getCombinedData);

module.exports = router;
