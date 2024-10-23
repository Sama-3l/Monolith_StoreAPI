// database related modules
module.exports = {
    databaseConnection: require('./connection'),
    ProductRepository: require('./repo/product-repo'),
    CustomerRepository: require('./repo/customer-repo'),
    ShoppingRepository: require('./repo/shopping-repo')
}