const colorways = require('../../models/ColorwaysTable');
import {colorwaySortMap} from "../../constant/QueryConstants"

/**
 * Gets all the colorways
 */
export const getAllColorways = () => {
    return new Promise( (resolve,reject) => {
        try {
            colorways
                .find()
                .exec(function(err, data) {
                    if(err != null){
                        reject (err)
                    } else {
                        resolve(data)
                    }
                })
        } catch (error) {
            reject("Cannot get All Colorways")
        }
    })
}

/**
 * Gets colorways based on filtering
 * @note will need to implement indexing for optimization + searching
 * @param colors: Array
 * @param brands: Array of ints
 * @param styles: Array of ints
 * @param genders: Array of ints
 * @param sort: String
 * @param numItems: int: Number of items per page
 */
export const getFilteredColorways = (colors, brands, styles, genders, sort, page, numItems) => {

    var aggregation:Object[] = [
        {
            "$lookup": {
                "from": "inventories",
                "let": {
                    "colorwayId": "$_id"
                },
                "pipeline": [
                    { //match invenotry that has the same colorwayId
                        "$match": {
                            "$expr": {
                                "$and": [
                                    {"$eq": ["$colorway", "$$colorwayId"]}
                                ]
                            }
                        }
                    },
                    { //replace price if needed
                        "$project":{
                            "price":{
                                "$cond": {"if": {"$eq": ["$sale", true]}, "then": "$salePrice", "else": "$price"}
                            }
                        }
                    }, 
                    { //group to calculate average price
                        "$group": {
                            "_id": "$colorway",
                            "avgCost": {"$avg": "$price"}
                        }
                    }
                ],
                "as": "avgPrice"
            }
        },
        { //remove colorways where there is no inventory
            "$match": {
                "$expr": { 
                    "$ne": ["$avgPrice", []]
                }
            }
        },
        { "$unwind": "$avgPrice" },
        { 
            "$project": {
                "colorwayName": 1,
                "name": 1,
                "product": 1,
                "brand": 1,
                "style": 1,
                "gender": 1,
                "pictures": 1,
                "avgPrice": "$avgPrice.avgCost" 
            }
        }
    ]


    var filters : Object[] = []
    var match = {}
    if (brands.length != 0){
        filters.push({"brand": {"$in": brands}})
    }
    if (colors.length != 0){
        filters.push({"colors": {"$in": colors}})
    }
    if (styles.length != 0){
        filters.push({"style": {"$in": styles}})
    }
    if (genders.length != 0){
        filters.push({"gender": {"$in": genders}})
    }   
    if (filters.length != 0){
        match["$and"] = filters
        aggregation.unshift({"$match": match})
    }

    var sortFilter
    switch(sort){
        case colorwaySortMap.new: //new arrivals
            sortFilter = {"_id": 1} //unsure if this correlates to arrivals
            break;
        case colorwaySortMap.alphabetical: //alphabetical
            sortFilter = {"name": 1, "colorwayName": 1}
            break;
        case colorwaySortMap.price_low_high: //price ascending
            sortFilter = {"avgPrice": 1}
            break;
        case colorwaySortMap.price_high_low: //price descending
            sortFilter = {"avgPrice": -1}
    }
    if (sortFilter != undefined){
        aggregation.push({"$sort":sortFilter})
    }

    return new Promise ((resolve, reject) => {
        try {
            colorways
                .aggregate(aggregation)
                // Note on .skip:
                // - skip is expensive as the page number increases
                // - as a result, we need to apply an index and use 
                //   a range of indices to achieve faster time
                // - some doc: https://stackoverflow.com/questions/7228169/slow-pagination-over-tons-of-records-in-mongodb
                // - will also need to check if page is within range; if not send error
                .skip(page)
                .limit(numItems)
                .then(results => {
                    resolve(results)
                })
        } catch (error) {
            reject("Cannot Filter and Sort for Colorways")
        }
    })
}
