require('dotenv').config({ path: './.env' });

const NotFoundError = require('./utils/errors/NotFoundError');

const express = require('express');

const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const { errors: celebrateErrors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./utils/errorHandler');

const limiter = require('./utils/rateLimit');

const app = express();
app.set('trust proxy', 1);

const { PORT, MONGODB_URI = 'mongodb://127.0.0.1:27017/database' } =
  process.env;

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.use(limiter);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/api', routes);

app.use((_req, _res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

app.use(errorLogger);

app.use(celebrateErrors());

app.use(errorHandler);

mongoose.set('strictQuery', false);

const connectWithRetry = () => {
  mongoose
    .connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('Connected to MongoDB');
      });
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

module.exports = app;
