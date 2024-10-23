const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema({
    name: {type: String, unique: true},
    products: [
        { type: Schema.Types.ObjectId, ref: 'product' }
    ],
});

module.exports = mongoose.model('categories', Category);