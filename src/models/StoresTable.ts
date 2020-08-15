/**
 * Schema design for stores Table
 */
import mongoose from 'mongoose';

//create schema
const storesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    storeLocations: [mongoose.ObjectId],
    logoThumbnailUrl: {
        type: String,
        required: true,
    },
    websiteUrl: String

});

module.exports = mongoose.model('stores', storesSchema);