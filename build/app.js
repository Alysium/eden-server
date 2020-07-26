"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
var express = require("express");
// Create a new express application instance
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    console.log("Hello World");
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});
exports.default = app;
