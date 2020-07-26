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
    }
});

module.exports = mongoose.model('inventories', inventoriesSchema);