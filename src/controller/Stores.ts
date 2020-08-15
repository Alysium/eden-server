import {getAllStoreLocations, getFilteredStoreLocations} from '../api/mongo/Stores'

/**
 * Controller to get All Store Locations
 * @route /storeLocationListingPage
 * @param req 
 * @param res 
 */
async function getAllStoreLocationsController(req, res){
    const getStoreLocationsPromise = async() => {
        var result = await(getAllStoreLocations());
    }

    getStoreLocationsPromise()
        .then(function(result) {
            res.json(result)
        })
        .catch(function(error){
            res.status(404).send('Cannot get all Store Locations')
        })
}


/**
 * Controller to get Filtered store locations based on a couple filters:
 *  - geographical location
 *  - store franchise
 * @param req 
 * @param res 
 * @reqParams lat: float, long: float, stores: string[arr]
 */
async function getFilteredStoreLocationsController(req, res) {
    const {lat, long, distance, stores} = req.query
    const getFilteredStoreLocationsPromise = async() => {
        return await(getFilteredStoreLocations(lat, long, distance, stores))
    }

    getFilteredStoreLocationsPromise()
        .then(function(result){
            res.send(result)
        })
        .catch(function(error){
            res.status(404).send('Cannot get all filtered Store Locations: ' + error)
        })
}


export {
    getAllStoreLocationsController,
    getFilteredStoreLocationsController
}