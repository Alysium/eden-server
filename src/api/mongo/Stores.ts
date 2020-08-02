const storeLocations = require("../../models/StoreLocationsTable")

export const getAllStoreLocations = () => {
    return new Promise ((resolve, reject) => {
        try {
            storeLocations
                .find()
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