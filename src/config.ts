const env = process.env.NODE_ENV // 'dev' or 'test'

const development = {
    app: {
        port: 3000
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

module.exports = config['development'];