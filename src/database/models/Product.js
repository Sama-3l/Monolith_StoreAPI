const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String, unique: true},
    desc: String,
    banner: String,
    markupPrice: Number,
    salePrice: Number,
    onSale: Boolean,
    category: { type: Schema.Types.ObjectId, ref: 'category', require: true },
    inventory: {
        S: { type: Number, default: 0 },
        M: { type: Number, default: 0 },
        L: { type: Number, default: 0 },
        XL: { type: Number, default: 0 },
        XXL: { type: Number, default: 0 },
    }
});

module.exports =  mongoose.model('product', ProductSchema);