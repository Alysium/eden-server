
import mongoose from 'mongoose';
const {ObjectId} = mongoose.Types;

//models used
const products = mongoose.model('products');
const colorways = mongoose.model('colorways');
const inventories = mongoose.model('inventories');
const stores = mongoose.model('stores');


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
                        "productInfo.colorways": 0
                    }
                },
                {
                    "$set": {
                        "productInfo": {
                            "$arrayElemAt": ["$productInfo", 0]
                        }
                    }
                },
                {
                    "$project":{
                        "colorwayName": 1,
                        "name": 1,
                        "productId": "$product",
                        "brand": 1,
                        "type": 1,
                        "gender": 1,
                        "pictures": 1,
                        "colors": 1,
                        "productInfo": "$productInfo.description"
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
 * -> Currently have a feature to include currently "selected" colorways
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
                                            {"$in": ["$_id", "$$colorwayId"]}
                                            //{"$ne": ["$_id", ObjectId(colorwayId)]}
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


export const getStores = (productId, long, lat, distance) => {//, long, lat, distance) => {
    return new Promise((resolve,reject) => {
        try {
            stores.aggregate([
                {
                    "$lookup": {
                        "from": "storeLocations",
                        "let":{
                            "storeId": "$_id"
                        },
                        "pipeline": [
                            
                            {
                                //for geographically with distance(m) from passed in position
                                "$geoNear": {
                                    "near": {"type": "Point", "coordinates": [long, lat]},
                                    "distanceField": "dist.calculated",
                                    "maxDistance": distance,
                                    "key": "coordinates",
                                    //Check: Why doesn't query work here?
                                    //"query": {"storeId": ObjectId("5f14a8f487fd3c7fd4153523")},
                                    //"query": {"storeId": "$$storeId"},
                                    "spherical": true
                                }
                            },
                            
                            { //first match storeLocation to store
                                "$match": {
                                    "$expr": {
                                        "$eq": ["$storeId", "$$storeId"]
                                    }
                                }
                            },
                            

                            { //lookup to get all the inventory corresponding to the product and the store location
                                "$lookup": {
                                    "from": "inventories",
                                    "let": {
                                        "storeLocId": "$_id"
                                    },
                                    "pipeline": [
                                        { //first match store location
                                            "$match": {
                                                "$expr": {
                                                    "$and": [
                                                        {"$eq": ["$storeLocation", "$$storeLocId"]},
                                                        {"$eq": ["$productId", ObjectId(productId)]}
                                                    ]
                                                }
                                            }
                                        }, 
                                        { //join on colorway data
                                            "$lookup": {
                                                "from": "colorways",
                                                "localField": "colorway",
                                                "foreignField": "_id",
                                                "as": "colorwayData"
                                            }
                                        }, 
                                        { //remove the array from join from teh colorway
                                            "$set": {
                                                "colorwayData": {
                                                    "$arrayElemAt": ["$colorwayData", 0]
                                                }
                                            }
                                        },
                                        {
                                            "$project": {
                                                "price": 1,
                                                "sale": "$salePrice",
                                                "sizes": 1,
                                                "newRelease":1,
                                                "colors": "$colorwayData.colors",
                                                "thumbnailUrl": "$colorwayData.thumbnailUrl",
                                                "imageUrls": "$colorwayData.pictures"
                                            }
                                        }
                                    ],
                                    "as": "colorways"
                                },
                                
                            },

                            {  //remove all storeLocations where there are no inventory carrying the product
                                "$match": {
                                    "$expr": {
                                        "$ne": ["$colorways", []]
                                    }
                                }
                            },
                            { //move calculated distance outside the distance object bracket
                                "$set":{
                                    "distance": "$dist.calculated"
                                }
                            },       
                            {
                                "$project": {
                                    "storeId": 0,
                                    "dist": 0
                                }
                            }
                        ],
                        "as": "branches"
                    },
                },
                { //want to remove all the entries where there are no store locations
                    "$match": {
                        "$expr": {
                            "$ne": ["$branches", []]
                        }
                    }
                }, 
                {
                    "$project": {
                        "storeLocations": 0
                    }
                }
            ]).then (results => {
                resolve(results)
            })
        } catch (error) {
            reject ("Cannot get Stores Carrying Product")
        }
    })

}


/**
 * Function to get product based on product Id
 * @param productId ObjectId
 */
export const getProduct = (productId) => {
    return new Promise( (resolve, reject) => {
        try {
            products.findOne(
                {
                    "_id": productId
                },
                {
                    "colorways": 0
                }
            ).then(results => {
                resolve(results)
            })
        } catch (error) {
            reject("Cannot get Product associated to Product Id")
        }

    })
}


