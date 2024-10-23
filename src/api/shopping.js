const router = require('express').Router()
const controller = require('./controller/shoppingController');
const ShoppingController = new controller();
const UserAuth = require('./middleware/auth')

// customer APIs
router.post('/order', UserAuth, ShoppingController.PlaceOrder);

router.get('/orders', UserAuth, ShoppingController.GetAllOrders);

module.exports = router;