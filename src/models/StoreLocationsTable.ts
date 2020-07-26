/**
 * Schema design for store location Table
 */
import mongoose from 'mongoose';

//create schema
const storeLocationsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    store: {
        type: mongoose.ObjectId,
        required: true,
    },
    geoLocation: {
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