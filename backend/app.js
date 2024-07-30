const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
require('dotenv').config();

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MERN Backend Challenge',
  });
});

app.use(cors());
app.use(express.json());

app.use(notFound);
app.use(errorHandler);

module.exports = app;
