const userRoute = require('express').Router();
const auth = require('../middleware/auth');
const {  getCurrentUser } = require('../controller/user');

userRoute.get('/me', auth, getCurrentUser);

module.exports = userRoute;