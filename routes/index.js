const router = require('express').Router();
const articleRoute = require('./articles');
const auth = require('./auth');
const userRoute = require('./user');

<<<<<<< HEAD
router.use("/api/articles", articleRoute);
router.use("/api/auth", auth);
router.use("/api/user", userRoute);
=======
router.use("/api/article", articleRoute);
router.use("/api/auth", auth);
router.use("/api/user", userRoute);

module.exports = router;
>>>>>>> rescue-stash
