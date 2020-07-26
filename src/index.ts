/**
 * File to set up Middleware layers + MongoDB datebase connection
 */
import app from "../configuration/Express";
import mongoURI from "../configuration/Mongo"

const mongoose = require('mongoose');
const bodyParser = require("body-parser");

  
//middleware additions
//body parser middleware
app.use(bodyParser.json());

//api middleware
//Note: May move all middle ware to own dedicated file in configuration
const colorwayQuery = require('./query/Colorways');
const storeQuery = require('./query/Stores');


app.use('/api/mongo/colorways', colorwayQuery);
app.use('/api/mongo/stores', storeQuery);



//MongoDB connection
mongoose
  .connect(
    mongoURI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }    
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("error: ", err));


export default app;
