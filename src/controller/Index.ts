const express = require('express');
const router = express.Router();

const products = require('./Products');

router
    .route('/mongo/products/:colorwayId')
    .get(products.getColorwayProduct);

router
    .route('/mongo/products/:productId')
    .get(products.getProduct);

module.exports = router;
