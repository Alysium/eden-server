/**
 * File for all configurations related to setting up express
 * 
 */

const express = require("express");


const app = express();
const port = 3000;

app.listen(port, () => {
    console.log('API Server started and listening on port ' + port);
  });

export default app;