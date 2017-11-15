var config = {};

//============================================================//
//***************** Session *******************//
//============================================================//
config.session = {
    "secret": "these aren't the droids you're looking for",
    "key": "sid",
    "cookie": {
        "httpOnly": true,
        "maxAge": null
    },
    "resave": false,
    "saveUninitialized": false
};

//============================================================//
//***************** Mongoose *******************//
//============================================================//
config.mongoose = {
    uri: "mongodb://127.0.0.1/transactions",
    options: {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    }
};

module.exports = config;
