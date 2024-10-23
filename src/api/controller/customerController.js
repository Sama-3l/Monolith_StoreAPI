const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const CustomerService = require('../../services/customer-service')
const service = new CustomerService();


class CustomerController{
    constructor(){};
    async Login(req, res, next){
        try {
            const { email, password } = req.body;
            const { data } = await service.Login({ email, password });
            if(data.message) return res.status(409).json(data);
            return res.json(data);
        } catch (err) {
            // next(err);
            return res.status(404).json({"message": "User profile not found"});
        }
    }

    async SignUp(req, res, next) {
        try {
            const { email, password, username } = req.body;
            const { data } = await service.SignUp({ email, password, username });
            if(data.message) return res.status(409).json(data);
            return res.json(data);
        } catch (err) {
            next(err);
        }
    }

    async GoogleLogin(req, res, next){
        const { tokenId } = req.body;  // Token received from Google on the frontend

        try {
            // Verify the token with Google
            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const { email, name, sub: googleId } = ticket.getPayload();  // Extract user data from the token
            const { data } = await service.GoogleSignIn(email, name, googleId);

            // Check if the user already exists in the database
            return res.json(data);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }

    async AddAddress(req, res, next){
        try {
            const { _id } = req.user;
        
            const { street, postalCode, city, country } = req.body;
        
            const { data } = await service.AddNewAddress(_id, {
                street,
                postalCode,
                city,
                country,
            });
        
            return res.json(data);
        } catch (err) {
            next(err);
        }
    }

    async GetProfile(req, res, next){
        try {
            const { _id } = req.user;
            const { data } = await service.GetProfile( _id );
            return res.json(data);
        } catch (err) {
            next(err);
        }
    }

    async GetWishlist(req, res, next){
        try {
            const { _id } = req.user;
            const { data } = await service.GetWishList(_id);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CustomerController;