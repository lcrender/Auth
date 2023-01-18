const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');
const { signUp, viewMe, logIn } = require('../controllers/authController');

router.post('/signup', signUp)
router.get('/me', verifyToken, viewMe)
router.post('/login', logIn)

module.exports = router;