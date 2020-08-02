import {getAllStoreLocations} from '../api/mongo/Stores'

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

export {
    getAllStoreLocationsController
}