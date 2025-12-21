const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} = require('../utils/errors');
const { JWT_SECRET } = require('../utils/config');

const register = async (req, res, next) => {
  console.log('Register function called with:', req.body);

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ConflictError('Email already exists'));
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const userWithoutPassword = await User.findById(user._id)
      .select('-password')
      .lean();

    return res.status(201).send(userWithoutPassword);
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError('Email already exists'));
    }
    console.error(err);
    if (err.name === 'ValidationError') {
      return next(err);
    }
    return next(new InternalServerError('An error has occurred on the server'));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new BadRequestError('Email and password are required'));
    }
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.send({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .select('-password')
      .orFail()
      .lean();

    return res.json(user);
  } catch (err) {
    console.error(err);
    if (err.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('User not found'));
    }
    return next(new InternalServerError('An error has occurred on the server'));
  }
};

module.exports = { getCurrentUser, register, login };
