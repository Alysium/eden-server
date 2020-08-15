/**
 * Schema design for colorways Table
 */
const mongoose = require("mongoose");

//create schema
const colorwaysSchema = new mongoose.Schema({
    colorwayName: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
    },
    brand : Number,
    type: Number,
    gender: Number,
    product: mongoose.ObjectId,
    colors: [Number],
    pictures: [String],
    thumbnailUrl: String
});

module.exports = mongoose.model('colorways', colorwaysSchema);