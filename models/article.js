const mongoose = require('mongoose');
const validator = require('validator');

const Article = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  author: {
    type: String,
    required: true,
    validate: {
    validator (value) {
      return value.length >= 2;
    },
    message: 'Author name must be at least 2 characters long',
  },
},
  title: {
    type: String,
    required: true,
    validate: {
    validator (value) {
      return value.length >= 2;
    },
    message: 'Title name must be at least 2 characters long',
  },
},

  description: {
    type: String,
    required: true,
    minlength: 2,
  },

  url: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
    message: "Must be a valid URL",
    },
  },

  urlToImage: {
    type: String,
    required: [true, 'The imageUrl field is required'],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    },
  },

  publishedAt: {
    type: Date,
    default: Date.now,
  },

  content: {
    type: String,
    required: true
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Article', Article);
