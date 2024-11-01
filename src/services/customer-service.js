const { CustomerRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors')


// All Business logic will be here
class CustomerService {

    constructor(){
        this.repository = new CustomerRepository();
    }

    async Login(data){
        const { email, password } = data;
        try {
            const existingCustomer = await this.repository.FindCustomer({ email});

            if(existingCustomer){
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
                if(validPassword){
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
                    return FormateData({id: existingCustomer._id, token });
                }
                else{
                    return FormateData({"message": "Incorrect Password"});
                }
            }
            return FormateData(null);
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async SignUp(data){
        const { email, password, username } = data;
        try{
            // create salt
            let isExisting = await this.repository.CheckCustomerExists({email, username});
            if(isExisting){
                return FormateData(isExisting);
            }
            let salt = await GenerateSalt();
            let userPassword = await GeneratePassword(password, salt);
            const existingCustomer = await this.repository.CreateCustomer({ email, password: userPassword, username, salt});
            const token = await GenerateSignature({ email: email, _id: existingCustomer._id});
            return FormateData({id: existingCustomer._id, token });
        }catch(err){
            console.log(err)
            throw new APIError('Data Not found', err)
        }
    }

    async GoogleSignIn(data){
        const {email, password, googleId } = data;
        try{
            const addressResult = await this.repository.GoogleSignIn({ email, password, googleId});
            return FormateData(addressResult);
        }catch(e){
            throw new APIError('Data Not found', err);
        }
    }

    async AddNewAddress(_id,data){
        
        const { street, postalCode, city,country} = data;
        
        try {
            const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city,country})
            return FormateData(addressResult);
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
        
    
    }

    async GetProfile(id){

        try {
            const existingCustomer = await this.repository.FindCustomerById(id);
            return FormateData(existingCustomer);
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async GetWishList(customerId){

        try {
            const wishListItems = await this.repository.Wishlist(customerId);
            return FormateData(wishListItems);
        } catch (err) {
            throw new APIError('Data Not found', err)           
        }
    }

    async ToggleWishlist(customerId, product){
        try {
            const wishlistResult = await this.repository.AddWishlistItem(customerId, product);        
           return FormateData(wishlistResult);
    
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async ManageCart(customerId, product, qty, isRemove){
        try {
            const cartResult = await this.repository.AddCartItem(customerId, product, qty, isRemove);
            return FormateData(cartResult);
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async ManageOrder(customerId, order){
        try {
            const orderResult = await this.repository.AddOrderToProfile(customerId, order);
            return FormateData(orderResult);
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async SubscribeEvents(payload){
 
        const { event, data } =  payload;

        const { userId, product, order, qty } = data;

        switch(event){
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishlist(userId,product)
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId,product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId,product,qty, true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId,order);
                break;
            default:
                break;
        }
 
    }

}

module.exports = CustomerService;