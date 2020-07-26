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
    locations: [mongoose.ObjectId],

});

module.exports = mongoose.model('stores', storesSchema);