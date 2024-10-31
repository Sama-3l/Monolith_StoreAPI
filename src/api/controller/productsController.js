const ProductService = require('../../services/product-service')
const CustomerService = require('../../services/customer-service');
const service = new ProductService();
const customerService = new CustomerService();

class ProductController{
    constructor(){};
    async Create(req, res, next) {
        try {
            const products = Array.isArray(req.body) ? req.body : [req.body]; 
            const result = await Promise.all(
                products.map(async (product) => {
                    const { name, description, banner, markupPrice, salePrice, onSale, category, inventory } = product;
    
                    // Call the service to create a product
                    const { data } = await service.CreateProduct({ name, desc: description, banner, markupPrice, salePrice, onSale, category, inventory });

                    return data;
                })
            );
    
            // Return all the results
            return res.json(result);
    
        } catch (err) {
            console.log(err);
            next(err);
        }
    };
    

    async GetProducts(req, res, next){
        try {
            const { data} = await service.GetProducts();        
            return res.status(200).json(data);
        } catch (error) {
            next(err)
        }
    }

    async GetCategories(req, res, next){
        try {
            const { data } = await service.GetCategories();        
            return res.status(200).json(data);
        } catch (error) {
            next(err)
        }
    }

    async GetProdByCategory(req, res, next){
        const type = req.params.type;
        
        try {
            const { data } = await service.GetProductsByCategory(type)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }
    }

    async GetProdById(req, res, next){
        const productId = req.params.id;

        try {
            const { data } = await service.GetProductDescription(productId);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }
    }

    async ToggleWishlist(req, res, next){
        const { _id } = req.user;
        try {
            const product = await service.GetProductById(req.body._id);
            const wishList = await customerService.ToggleWishlist(_id, product)
            return res.status(200).json(wishList);
        } catch (err) {
            
        }
    }

    async Cart(req, res, next){
        const { _id, qty } = req.body;
        try {     
            const product = await service.GetProductById(_id);
    
            const result =  await customerService.ManageCart(req.user._id, product, qty, false);
            console.log(result);
            return res.status(200).json(result);
            
        } catch (err) {
            next(err)
        }
    }

    async CartDelete(req, res, next){
        const { _id } = req.user;
        try {
            const product = await service.GetProductById(req.params.id);
            const result = await customerService.ManageCart(_id, product, 0 , true);             
            return res.status(200).json(result);
        } catch (err) {
            next(err)
        }
    }
}


module.exports = ProductController