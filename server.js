// set up ======================================================================
require('dotenv').config();
require('magic-globals');
var express = require('express');
var mongoose = require('mongoose'); 				// mongoose for mongodb
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var config = require('./libs/config');
var models = require('./app/models/');

var app = express(); 						// create our app w/ express
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(function (req, res, next) {
  models(function (err, db) {
    if (err) return next(err);

    req.models = db.models;
    req.db     = db;

    return next();
  });
}),

app.use(cookieParser(config.session.secret));

var sessionStore = require('./libs/sessionStore');
app.use(session({
    secret: config.session.secret,
    key: config.session.key,
    cookie: config.session.cookie,
    store: sessionStore,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized
}));

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// routes ======================================================================
require('./app/routes/')(app);

// listen (start app with node server.js) ======================================
app.listen(config.port);
console.log("App listening on port " + config.port);
