/**
 * File to set up Middleware layers + MongoDB datebase connection
 */
const express = require("express");
const bodyParser = require("body-parser");

require('./models/Db');

const app = express();
const port = 3000;

//middleware additions
app.use(bodyParser.json());



app.listen(port, () => {
    console.log('API Server started and listening on port ' + port);
});


const apiRouter = require('./controller/Index')

app.use('/api', apiRouter);


//Capture All 404 errors
app.use(function (req,res,next){
	res.status(404).send('Unable to find the requested resource!');
});

export default app;
