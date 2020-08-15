/**
 * Schema design for store location Table
 */
import mongoose from 'mongoose';

//create schema
const storeLocationsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    store: {
        type: mongoose.ObjectId,
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

module.exports = mongoose.model('storeLocations', storeLocationsSchema);