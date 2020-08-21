/**
 * File for all settings related to mongoDB setup
 */
export {}
const mongoose = require('mongoose');
const config = require('../config')



const {db: {userName, userPwd, dbName}} = config
const mongoURL = `mongodb+srv://${userName}:${userPwd}@eden-db.3sxhh.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connect = () => {
    setTimeout(() => mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true }), 1000);
}

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', err => {
    console.log('Error Connecting to MongoDB: ' + err);
    return connect();
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB Disconnected');
});


connect();

//Mongo Models Used
/*
import {ColorwaysModel} from "./colorways/colorways.model"
import {InventoriesModel} from "./inventories/inventories.model"
import {ProductsModel} from "./products/products.model"
import {StoreLocationsModel} from "./storeLocations/storeLocations.model"
import {StoresModel} from "./stores/stores.model"
*/


require('./products/products.model');
require('./colorways/colorways.model');
require('./inventories/inventories.model');
require('./storeLocations/storeLocations.model');
require('./stores/stores.model');
