const router = require('express').Router()
const controller = require('./controller/customerController');
const CustomerController = new controller();
const UserAuth = require('./middleware/auth')

// customer APIs
router.post('/signup', CustomerController.SignUp);
router.post('/login', CustomerController.Login);
router.post('/google-login', CustomerController.GoogleLogin)
router.post('/address', UserAuth, CustomerController.AddAddress);

router.get('/profile', UserAuth, CustomerController.GetProfile);
router.get('/wishlist', UserAuth, CustomerController.GetWishlist);

module.exports = router;