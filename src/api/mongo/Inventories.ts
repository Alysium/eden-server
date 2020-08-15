const inventories = require('../../models/InventoriesTable');

const ObjectId = require('mongoose')


export const getAllStoreLocationInv = (storeLocId) => {
    return new Promise ((resolve, reject) => {
        try {
            inventories
                .find({"storeLocation": ObjectId(storeLocId)})
                .toArray(function(err, data) {
                    if(err){
                        reject (err)
                    } else {
                        resolve(data)
                    }
                })
        } catch (error) {
            reject("Cannot get All Store Locations")
        }
    })
}

export const getFilteredStoreLocationInv = (storeLocId) => {

    return new Promise ((resolve, reject) => {
        try {
            inventories.aggregate([
                {
                    "$match": {"storeLocation": ObjectId(storeLocId)}
                },
                { //first inner join the documents from the colorways
                    "$lookup": {
                        "from": "colorways",
                        "localField": "colorwayId",
                        "foreignField": "_id",
                        "as": "colorwayInfo"
                    }
                }
                // now perform relevant sorting + filtering (to be implemented)
            ])
        } catch (error){
            reject("Cannot get Inventory At Store Location")
        }
    })
}