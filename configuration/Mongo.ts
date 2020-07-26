/**
 * File for all settings related to mongoDB setup
 */
 const userName = "EDEN_user";
 const userPwd = "EDEN_user_123";
 const dbName = "Prototype"
 const mongoURI = `mongodb+srv://${userName}:${userPwd}@eden-db.3sxhh.mongodb.net/${dbName}?retryWrites=true&w=majority`;
 export default mongoURI;