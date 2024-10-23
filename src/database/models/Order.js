const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId: String,
    customerName: String,
    amount: Number,
    status: String,
    txnId: String,
    address: String,
    items: [
        {   
            product: {type: Schema.Types.ObjectId, ref: 'product', required: true} ,
            units: {
                S: { type: Number, default: 0 },
                M: { type: Number, default: 0 },
                L: { type: Number, default: 0 },
                XL: { type: Number, default: 0 },
                XXL: { type: Number, default: 0 },
            } 
        }
    ]
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('order', OrderSchema);