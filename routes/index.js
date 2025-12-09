const router = require('express').Router();
const articleRoute = require('./articles');
const auth = require('./auth');
const userRoute = require('./user');
const newsRoute = require('./news');


router.use("/api/articles", articleRoute);
router.use("/api/auth", auth);
router.use("/api/user", userRoute);
router.use("/api/news", newsRoute);

module.exports = router;

