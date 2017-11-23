var util = require('util');
var config = {};

config.port = process.env.PORT || 8080;

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

//============================================================//
//***************** MySQL *******************//
//============================================================//

/*
config.mysql = {
  db_host : process.env.MYSQL_DB_HOST,
  db_user : process.env.MYSQL_DB_USER,
  db_pass : process.env.MYSQL_DB_PASS,
  db_name : process.env.MYSQL_DB_NAME,
}

config.mysql.URI = util.format("mysql://%s:%s@%s/%s",
                                config.mysql.db_user,
                                config.mysql.db_pass,
                                config.mysql.db_host,
                                config.mysql.db_name);
*/

config.mysql = {
  protocol : "mysql",
  query    : { pool: true },
  host     : process.env.MYSQL_DB_HOST,
  database : process.env.MYSQL_DB_NAME,
  user     : process.env.MYSQL_DB_USER,
  password : process.env.MYSQL_DB_PASS,
}

module.exports = config;
