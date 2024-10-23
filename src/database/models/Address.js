const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    phoneNumber: String,
    apartment: String,
    street: String,
    postalCode: String,
    city: String,
    country: String
});

module.exports =  mongoose.model('address', AddressSchema);