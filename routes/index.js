const router = require('express').Router();
const articleRoute = require('./articles');
const auth = require('./auth');
const userRoute = require('./user');
const newsRoute = require('./news');

router.use("/articles", articleRoute);
router.use("/auth", auth);
router.use("/user", userRoute);
router.use("/news", newsRoute);

module.exports = router;

