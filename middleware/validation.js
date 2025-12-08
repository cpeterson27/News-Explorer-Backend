const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Invalid URL format');
};

const validateArticle = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'The "name" field is required',
    }),
    urlToImage: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "urlToImage" field is required',
    }),
    title: Joi.string().required().min(2).messages({
      'string.min': 'Title name must be at least 2 characters long',
      'string.empty': 'The "title" field is required',
    }),
    author: Joi.string().required().min(2).messages({
      'string.min': 'Author name must be at least 2 characters long',
      'string.empty': 'The "author" field is required',
    }),
    description: Joi.string().required().min(2).messages({
      'string.min': 'Description must be at least 2 characters long',
      'string.empty': 'The "description" field is required',
    }),
    content: Joi.string().required().messages({
      'string.empty': 'The "content" field is required',
    }),
    owner: Joi.string().required().messages({
      'string.empty': 'The "owner" field is required',
    }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'The "name" field is required',
    }),
    email: Joi.string().required().email().messages({
      'string.email': 'The "email" field must be a valid email address',
      'string.empty': 'The "email" field is required',
    }),
    password: Joi.string()
  .required()
  .min(8)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    'string.empty': 'The "password" field is required',
  }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'The "email" field must be a valid email address',
      'string.empty': 'The "email" field is required',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field is required',
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      'string.length': 'The "id" must be 24 hexadecimal characters',
      'string.hex': 'The "id" must contain only hexadecimal characters',
    }),
  }),
});

module.exports = {
  validateArticle,
  validateUserBody,
  validateAuthentication,
  validateId,
};