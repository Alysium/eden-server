const express = require('express');
const router = express.Router();

const products = require('./Products');

router
    .route('/productPage/:productId/:colorwayId')
    .get(products.getProductPageData);

module.exports = router;