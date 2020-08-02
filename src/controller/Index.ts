const express = require('express');
const router = express.Router();

const products = require('./Products');
const stores = require('./Stores')
const productListing = require('./ProductListing')

router
    .route('/productPage/:productId/:colorwayId')
    .get(products.getProductPageDataController);

router
    .route('/storeLocationListingPage')
    .get(stores.getAllStoreLocationsController)

router
    .route('/colorways/all')
    .get(productListing.getAllColorwaysController)

router
    .route('/colorways/filter')
    .get(productListing.getFilteredColorwaysController)

module.exports = router;