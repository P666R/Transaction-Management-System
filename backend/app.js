const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
require('dotenv').config();

const transactionRoutes = require('./routes/transactionRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

app.use('/api/v1/transactions', transactionRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
