const router = require('express').Router();
<<<<<<< HEAD
const { register, login } = require('../controllers/user');
const { validateUserBody, validateAuthentication } = require('../middlewares/validation')
=======
const { register, login } = require('../controller/user');
const { validateUserBody, validateAuthentication } = require('../middleware/validation')
>>>>>>> rescue-stash

router.post('/signup', validateUserBody, register);
router.post('/signin', validateAuthentication, login);

module.exports = router;