/**
 * This is a Temp MongoDB Connection for the first mile stone
 *  -> This file may need to be edited/removed in exchanged for more secure + efficient connections
 */


const username = "EDEN_user";
const password = "EDEN_user_123";
const dbname = "EDEN-DB";

const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://<username>:<password>@eden-db.3sxhh.mongodb.net/<dbname>?retryWrites=true&w=majority";
const uri = `mongodb+srv://${username}:${password}@eden-db.3sxhh.mongodb.net/${dbname}?retryWrites=true&w=majority`;
export const client = new MongoClient(uri, { useNewUrlParser: true });
