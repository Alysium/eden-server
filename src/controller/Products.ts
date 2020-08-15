import {getProductColorways, getColorwayInv, getColorwayData, getProduct, getStores} from '../api/mongo/Products';

//to do: Need to convert the entry points into the controller as per the model-view-controller code structure

/*
APIs needed on the Product Page
-> Get colorway by ObjectId
-> get corresponding product to the colorways
-> get all other related colorways    
*/

/**
 * Controller to get all data needed for Product Page
 * Data Includes:
 *  - All Colorways of a Product
 *  - All inventory of a Colorway
 *  - Colorway and Product Associated for Display
 * @route /productPage/:productId/:colorwayId
 * @param req 
 * @param res 
 */
/*
async function getProductPageDataController(req, res) {

    const {colorwayId, productId} = req.params;

    await Promise.all([
        getColorwayData(colorwayId),
        getColorwayInv(colorwayId),
        getProductColorways(colorwayId,productId)
    ]).then(responseArr => {
        res.json({
            "colorwayData": responseArr[0],
            "colorwayInv": responseArr[1],
            "productColorways": responseArr[2],
        })
    }).catch(function(error){
        res.status(404).send('Product Page Data Not Found')
    })
}*/

/**
 * Controller to get all teh data needed for the Product Page
 * Data Includes:
 *  - 
 * @route /productPage/:productId/?long=____&lat=_____&distance=____
 * @param req 
 * @param res 
 */
async function getProductPageDataController(req, res) {
    const {productId} = req.params;
    var {long, lat, distance} = req.query;
    try {
        long = Number(long);
        lat = Number(lat);
        distance = Number(distance);
    } catch (error) {
        res.status(404).send('Cannot get current location')
    }

    await Promise.all([
        getProduct(productId),
        getStores(productId, long, lat, distance)
    ]).then(responseArr => {
        res.json({
            "shoe": responseArr[0],
            "stores": responseArr[1] 
        })
    }).catch(function(error){
        res.status(404).send('Cannot get Product Page Data' + error)
    })
}


export {
    getProductPageDataController,
}
