import {getAllColorways, getFilteredColorways} from "../api/mongo/ProductListing"


/**
 * Controller to get all Colorways
 * @route /colorways
 * @param req 
 * @param res 
 */
async function getAllColorwaysController(req, res){
    const getAllColorwaysPromise = async() => {
        return await(getAllColorways());
    }
    getAllColorwaysPromise()
        .then(function(result) {
            res.send(result)
        })
        .catch(function(error){
            res.status(404).send('Cannot get all colorways: ' + error);
        })
}

/**
 * Controller to get Colorway Listing
 * @param req 
 * @param res 
 * @parms colors: int[], styles: int[], genders: int[], brands: int[], sort: int, page: int, numItems: int
 */
async function getFilteredColorwaysController(req, res){
    let {colors, styles, genders, brands, sort, page, numItems} = req.query

    // var colors = [1]
    // var styles = []
    // var genders = []
    // var brands = []
    // var sort = 5
    // var page = 12
    // var numItems = 20

    const getFilteredColorwaysPromise = async() => {
        return await(getFilteredColorways(colors, brands, styles, genders, sort, page, numItems));
    }
    getFilteredColorwaysPromise()
        .then(function(result){
            res.send(result)
        })
        .catch(function(error){
            res.status(404).send('Cannot get all Filtered Colorways: ' + error);
        })
}

export {
    getAllColorwaysController,
    getFilteredColorwaysController
}