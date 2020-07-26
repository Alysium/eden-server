import {client} from "../constant/MongoConnectionConstants";
import express from 'express';
const router = express.Router();
//connect functions to be callable via API

const colorways = require('../models/ColorwaysTable');

/**
 * Get all colorways
 * @endpoint /api/mongo/colorways/
 */
router.get('/', function(req, res){
    console.log("Colorways app seen");
    colorways.find()
        .then(result => res.json(result))
});



module.exports = router;