const router = require('express').Router();

const { register, login } = require('../controller/user');
const {
  validateUserBody,
  validateAuthentication,
} = require('../middleware/validation');

router.post('/signup', validateUserBody, register);
router.post('/signin', validateAuthentication, login);

module.exports = router;
