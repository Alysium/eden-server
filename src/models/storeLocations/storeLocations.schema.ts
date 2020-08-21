/**
 * Schema design for store location Table
 */
import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types
//create schema
const storeLocationsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    store: {
        type: ObjectId,
        required: true,
    },
    coordinates: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

export default storeLocationsSchema