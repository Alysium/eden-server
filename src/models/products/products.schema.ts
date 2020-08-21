import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types
//create schema
const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    colorways: [ObjectId],
    description: {
        type: String,
        required: true
    },
    brand: Number,
    type: Number,
    gender: Number
});
export default ProductsSchema
