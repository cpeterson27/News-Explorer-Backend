const router = require('express').Router();
const articleRoute = require('./articles');
const auth = require('./auth');
const userRoute = require('./user');
const newsRoute = require('./news');

// Remove /api prefix since it's already added in app.js
router.use("/articles", articleRoute);
router.use("/auth", auth);
router.use("/user", userRoute);
router.use("/news", newsRoute);

module.exports = router;

