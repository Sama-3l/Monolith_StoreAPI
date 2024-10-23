const router = require('express').Router()
const controller = require('./controller/productsController');
const ProductController = new controller();
const UserAuth = require('./middleware/auth')

// product APIs
router.post('/create', UserAuth, ProductController.Create);

router.get('/', ProductController.GetProducts)
router.get('/category/:type', ProductController.GetProdByCategory);
router.get('/:id', ProductController.GetProdById)

router.put('/toggleWishlist', UserAuth, ProductController.ToggleWishlist)
router.put('/cart', UserAuth, ProductController.Cart)

router.delete('/cart/:id', UserAuth, ProductController.CartDelete)

module.exports = router;