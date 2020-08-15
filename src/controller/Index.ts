const express = require('express');
const router = express.Router();

const products = require('./Products');
const stores = require('./Stores')
const productListing = require('./ProductListing')

router
    .route('/productPage/:productId/')
    .get(products.getProductPageDataController);

router
    .route('/colorways/all')
    .get(productListing.getAllColorwaysController)

router
    .route('/colorways/filter')
    .get(productListing.getFilteredColorwaysController)


router
    .route('/storeLocations')
    .get(stores.getAllStoreLocationsController)


router
    .route('/storeLocations/filter')
    .get(stores.getFilteredStoreLocationsController)


module.exports = router;