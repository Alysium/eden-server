import mongoose from 'mongoose'
const storeLocations = mongoose.model('storeLocations');

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

/**
 * Call to get all the store locations associated to selected stores
 * @param lat latitude
 * @param long longitude
 * @param distance distance in metres (m)
 * @param stores store franchise filter (if needed)
 */
export const getFilteredStoreLocations = (lat, long, distance, stores) => {
    return new Promise ((resolve, reject) => {
        try {
            storeLocations.aggregate([
                {
                    "$geoNear": {
                        "near": {"type": "Point", "coordinates": [long, lat]},
                        "distanceField": "dist.calculated",
                        "maxDistance": distance,
                        "includeLocs": "dist.location",
                        "spherical": true
                    }
                }
            ]).then(results => {
                resolve(results)
            })
        } catch (error) {
            reject("Cannot get Store Locations")
        }
    })
}