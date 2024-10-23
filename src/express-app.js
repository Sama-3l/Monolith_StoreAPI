const express = require('express');
const cors  = require('cors');
const HandleErrors = require('./utils/error-handler');
const { customer, products, shopping } = require('./api');

module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    app.use('/product', products);
    app.use('/customer', customer);
    app.use('/shopping', shopping)

    app.use(HandleErrors);
}