var path = require('path');
var express = require('express');

module.exports = function(app) {
    app.use('/app', express.static(path.join(__dirname, '../../app')));
    app.use('/scripts', express.static(path.join(__dirname, '../../node_modules')));
    app.use('/bower_components', express.static(path.join(__dirname, '../../bower_components')));
    app.use(express.static(path.join(__dirname, '../../public')));
    app.get('/', function(req, res) {
        res.send("Hello!");
    });

    return app;
}
