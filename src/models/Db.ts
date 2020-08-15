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
require('./ProductsTable');
require('./ColorwaysTable');
require('./InventoriesTable');
require('./StoreLocationsTable');
require('./StoresTable');