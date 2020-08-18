/**
 * Schema design for colorways Table
 */
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
//create schema
const ColorwaysSchema = new mongoose.Schema({
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
    product: ObjectId,
    colors: [Number],
    pictures: [String],
    thumbnailUrl: String
});

export default ColorwaysSchema;