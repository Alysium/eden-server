require('dotenv').config()
const env = process.env.NODE_ENV // 'dev' or 'test'
console.log("App running in " + env)
console.log("process.env.PORT " + process.env.PORT)

const development = {
    app: {
        port: parseInt(process.env.PORT) || 3000 
    },
    db: {
        userName: "EDEN_user",
        userPwd: "EDEN_user_123",
        dbName: "Prototype"
    }
}

const test = {
    app: {
        port: 3000
    },
    db: {
        userName: "EDEN_user",
        userPwd: "EDEN_user_123",
        dbName: "Prototype"
    }
}

const config = {
    development, 
    test
}

module.exports = development//config[env];