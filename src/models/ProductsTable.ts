/**
 * Schema design for products Table
 */
import mongoose from 'mongoose';

//create schema
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    colorways: [mongoose.ObjectId],
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('products', productsSchema);