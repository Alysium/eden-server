"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * File to set up Middleware layers + MongoDB datebase connection
 */
var express = require("express");
var bodyParser = require("body-parser");
require('./models/Db');
var app = express();
var port = 3000;
//middleware additions
app.use(bodyParser.json());
app.listen(port, function () {
    console.log('API Server started and listening on port ' + port);
});
var apiRouter = require('./controller/Index');
app.use('/api', apiRouter);
//api middleware
//Note: May move all middle ware to own dedicated file in configuration
var colorwayQuery = require('./controller/Products');
app.use('/api/mongo/products', colorwayQuery);
//Capture All 404 errors
app.use(function (req, res, next) {
    res.status(404).send('Unable to find the requested resource!');
});
exports.default = app;
