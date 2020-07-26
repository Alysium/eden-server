import {client} from "../constant/MongoConnectionConstants";
import express from 'express';
const router = express.Router();
//connect functions to be callable via API

const stores = require('../models/StoresTable');

/**
 * Get all stores
 * @endpoint /api/mongo/stores/
 */
router.get('/', function(req, res){
    console.log("Stores app seen");
    stores.find()
        .then(result => res.json(result))
});


module.exports = router;