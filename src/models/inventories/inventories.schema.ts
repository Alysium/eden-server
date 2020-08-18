/**
 * Schema design for products Table
 */
import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types
//create schema
const InventoriesSchema = new mongoose.Schema({
    colorway: ObjectId,
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
        type: ObjectId,
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
export default InventoriesSchema