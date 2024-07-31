const Transaction = require('../models/transaction');

const getAllTransactions = async (month, page, perPage, search) => {
  let filter = {};
  if (month) {
    filter = {
      $expr: { $eq: [{ $month: '$dateOfSale' }, month] },
    };
  }

  if (search) {
    const searchNumber = Number(search);

    if (!isNaN(searchNumber)) {
      filter.price = searchNumber;
    } else {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
  }

  const options = {
    skip: (page - 1) * perPage,
    limit: +perPage,
  };

  return Transaction.find(filter).skip(options.skip).limit(options.limit);
};

const getTransactionStatistics = async (month) => {
  const totalSaleAmount = await Transaction.aggregate([
    {
      $match: {
        $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
      },
    },
    {
      $group: {
        _id: null,
        totalSale: { $sum: '$price' },
        soldItems: { $sum: { $cond: [{ $eq: ['$sold', true] }, 1, 0] } },
        notSoldItems: { $sum: { $cond: [{ $eq: ['$sold', false] }, 1, 0] } },
      },
    },
    {
      $project: {
        _id: 0,
        totalSale: 1,
        soldItems: 1,
        notSoldItems: 1,
      },
    },
  ]);

  return totalSaleAmount[0] || { totalSale: 0, soldItems: 0, notSoldItems: 0 };
};

const getTransactionBarChart = async (month) => {
  const priceRanges = [
    { range: '0-100', min: 0, max: 100 },
    { range: '101-200', min: 101, max: 200 },
    { range: '201-300', min: 201, max: 300 },
    { range: '301-400', min: 301, max: 400 },
    { range: '401-500', min: 401, max: 500 },
    { range: '501-600', min: 501, max: 600 },
    { range: '601-700', min: 601, max: 700 },
    { range: '701-800', min: 701, max: 800 },
    { range: '801-900', min: 801, max: 900 },
    { range: '901-above', min: 901, max: Infinity },
  ];

  const barChartData = await Promise.all(
    priceRanges.map(async (range) => {
      const count = await Transaction.countDocuments({
        $expr: { $eq: [{ $month: '$dateOfSale' }, month] },
        price: { $gte: range.min, $lt: range.max },
      });
      return { range: range.range, count };
    })
  );

  return barChartData;
};

const getTransactionPieChart = async (month) => {
  const pieChartData = await Transaction.aggregate([
    {
      $match: {
        $expr: { $eq: [{ $month: '$dateOfSale' }, month] },
      },
    },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        count: 1,
      },
    },
  ]);

  return pieChartData;
};

module.exports = {
  getAllTransactions,
  getTransactionStatistics,
  getTransactionBarChart,
  getTransactionPieChart,
};
