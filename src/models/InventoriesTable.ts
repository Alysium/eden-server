/**
 * Schema design for products Table
 */
import mongoose from 'mongoose';

//create schema
const inventoriesSchema = new mongoose.Schema({
    colorway: mongoose.ObjectId,
    price: {
        type: Number,
        required: true
    },
    salePrice: Number,
    sale: {
        type: Boolean,
        default: false,
    },
    sizes: Object,
    storeLocation: {
        type: mongoose.ObjectId,
        required: true
    },
    newRelease: Boolean
});

/*
Potential changes to database:
- add "location" field to the schema which consists of lat/long of the storeLocation
    -> this allows for indexing and removes the need for performing a join operation
    -> this makes it easier to look for "products around 10km from my current location or a set location"

*/

module.exports = mongoose.model('inventories', inventoriesSchema);