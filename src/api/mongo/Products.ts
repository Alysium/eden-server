const ObjectId = require('mongodb').ObjectId; 

//model required
const colorways = require('../../models/ColorwaysTable');
const products = require('../../models/ProductsTable');
const inventories = require('../../models/InventoriesTable');

/**
 * Gets all data needed for getting info from Product Page
 * @param colorwayId ObjectId
 */
export const getColorwayData = (colorwayId) => {
    return new Promise( (resolve, reject) => {
        try{
            colorways.aggregate([
                {
                    "$match": {"_id": ObjectId(colorwayId)}
                },
                {
                    "$lookup": {
                        "from": "products",
                        "localField": "product",
                        "foreignField": "_id",
                        "as": "productInfo"
                    }
                },
                {
                    "$project": {
                        "productInfo._id": 0,
                        "productInfo.name": 0,
                    }
                }
            ]).then(results => {
                if (results.length == 0){
                    reject("Colorway Id Entered is Not Found")
                }
                resolve(results)
            })
        } catch (error) {
            reject("Cannot get Colorway Data of ColorwayId")
        }
    })
}

/**
 * Gets Inventory Product Page data
 * @param colorwayId ObjectId
 * Ref: https://dba.stackexchange.com/questions/254140/filter-based-on-values-after-join-operation-mongodb
 */
export const getColorwayInv = (colorwayId) => {
    
    return new Promise((resolve, reject) => {
        try{
            inventories.aggregate([
                {
                    "$match": {"colorway": ObjectId(colorwayId)}
                }, 
                {
                    "$lookup": {
                        "from": "storeLocations",
                        "let": {
                            "storeLocationId": "$storeLocation"
                        },
                        // for variables
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": {
                                        "$and": [
                                            {"$eq": ["$_id", "$$storeLocationId"]}
                                        ]
                                    }
                                }
                            },
                        ],
                        "as": "storeLocationInfo"
                    }            
                },
                {
                    "$set": {
                        "storeLocationInfo": {
                            "$arrayElemAt": ["$storeLocationInfo", 0]
                        }
                    }
                },
                {
                    "$project": {
                        "price": 1,
                        "salePrice": 1,
                        "sale": 1,
                        "sizes": 1,
                        "store": "$storeLocationInfo.name",
                        "location": "$storeLocationInfo.location",
                        "address": "$storeLocationInfo.address"
                    }
                }
            ]).then(function(results){
                if (results.length == 0){
                    reject("Colorway Id Entered is Not Found")
                }
                resolve(results)
            })
        } catch (error) {
            reject("Cannot get Inventory of the ColorwayId")
        }

    })
}

/**
 * Function to get all colorways of a product
 * -> Currently have a feature to not include currently "selected" colorways
 * @todo Ask Omar if ^that is needed
 * @param colorwayId ObjectId
 * @param productId ObjectId
 */
export const getProductColorways = (colorwayId, productId) => {
    return new Promise( (resolve, reject) => {
        try {
            products.aggregate([
                {
                    "$match": {"_id": ObjectId(productId)}
                },
                {
                    "$lookup": {
                        "from": "colorways",
                        "let": {
                            "colorwayId": "$colorways"
                        },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": {
                                        "$and": [
                                            {"$in": ["$_id", "$$colorwayId"]},
                                            {"$ne": ["$_id", ObjectId(colorwayId)]}
                                        ]
                                    }
                                }
                            },
                        ],
                        "as": "colorways"
                    }
                },
                {
                    "$project": {
                        "colorways": "$colorways"
                    }
                }
            ]).then(function(results){
                if (results.length == 0){
                    reject("Product Id Entered is Not Found")
                }
                resolve(results)
            })   
        } catch (error) {
            reject("Cannot get the Colorways associated to the Product Id")
        }

    })
}
