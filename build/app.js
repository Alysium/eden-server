"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * File to set up Middleware layers + MongoDB datebase connection
 */
var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config");
require('./models/db');
var port = config.app.port;
var app = express();
//middleware additions
app.use(bodyParser.json());
app.listen(port, function () {
    console.log('API Server started and listening on port ' + port);
});
var apiRouter = require('./controller/Index');
app.use('/api', apiRouter);
//Capture All 404 errors
app.use(function (req, res, next) {
    res.status(404).send('Unable to find the requested resource!');
});
exports.default = app;
