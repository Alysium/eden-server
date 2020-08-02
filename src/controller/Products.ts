import {getProductColorways, getColorwayInv, getColorwayData} from '../api/mongo/Products';

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
}

export {
    getProductPageDataController
}