const rateLimit = require('express-rate-limit');

<<<<<<< HEAD
const rateLimit = rateLimit({
=======
const limiter = rateLimit({
>>>>>>> rescue-stash
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

<<<<<<< HEAD
module.exports = rateLimit;
=======
module.exports = limiter;
>>>>>>> rescue-stash
