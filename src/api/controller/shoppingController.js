const ShoppingService = require('../../services/shopping-service')
const service = new ShoppingService();

class ShoppingController{
    constructor(){}
    async PlaceOrder(req, res, next){
        const { _id } = req.user;
        const { txnNumber } = req.body;
        try {
            const { data } = await service.PlaceOrder({_id, txnNumber});
            return res.status(200).json(data);
            
        } catch (err) {
            next(err)
        }
    }

    async GetAllOrders(req, res, next){
        const { _id } = req.user;

        try {
            const { data } = await userService.GetShopingDetails(_id);
            return res.status(200).json(data.orders);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ShoppingController