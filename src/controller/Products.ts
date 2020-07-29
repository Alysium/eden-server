import express from 'express';
const router = express.Router();
//connect functions to be callable via API
const ObjectId = require('mongodb').ObjectId; 

//model required
const colorways = require('../models/ColorwaysTable');
const products = require('../models/ProductsTable');
const inventories = require('../models/InventoriesTable');

//to do: Need to convert the entry points into the controller as per the model-view-controller code structure

/*
APIs needed on the Product Page
-> Get colorway by ObjectId
-> get corresponding product to the colorways
-> get all other related colorways    
*/


/**
 * Get colorway + Product information 
 * @param req 
 * @param res 
 */
const getColorwayProduct = (req, res) => {
    //want to query and also error check
    const {colorwayId} = req.params;
    console.log("getColorwayProduct function is triggered");

    colorways.findOne({
        "_id": ObjectId(colorwayId)
    }).then(colorway => {
        console.log("colorway", colorway);
        if (colorway == null){
            res.status(404).send('Unable to find the colorway by colorwayId');
        }
        return products.findOne({
            "_id": ObjectId(colorway.product)
        }).then(product => {
            console.log("product", product);
            res.json({
                ...colorway._doc,
                ...product._doc
            }) 
        })
    })
}

/**
 * Get all colorways given an array of colorway Ids
 * @param req 
 * @param res 
 */
const getColorways = (req, res) => {
    const {colorwayIds} = req.params;
    colorways.find({
        "_id": {
            "$in": colorwayIds
        }
    }).then(colorways => {
        res.json(colorways)
    })
}

/**
 * Get specific product Information by productId
 * @param req 
 * @param res 
 */
const getProduct = (req, res) => {
    const {productId} = req.params;
    products.findOne({
        "_id": ObjectId(productId)
    }).then(product => {
        res.json(product)
    })
}

const getColorwayInventory = (req, res) => {
    const {colorwayId} = req.parms;

    inventories.find({
        "colorway": ObjectId(colorwayId)
    }).then(inv => {
        res.json(inv);
    })


}

export {
    getColorwayProduct,
    getProduct,
    getColorways,
    getColorwayInventory
}