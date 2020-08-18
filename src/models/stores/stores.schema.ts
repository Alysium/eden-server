/**
 * Schema design for stores Table
 */
import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types
//create schema
const storesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    storeLocations: [ObjectId],
    logoThumbnailUrl: {
        type: String,
        required: true,
    },
    websiteUrl: String

});

export default storesSchema