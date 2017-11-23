var config = require('../../libs/config');
var orm = require('orm');
require('magic-globals')

var connection = null;

function setup(db, cb) {
    require('./org')(orm, db);

    return cb(null, db);
}

module.exports = function(cb) {
    if (connection) return cb(null, connection);
    
    orm.connect(config.mysql, function(err, db) {
        if (err) return cb(err);

        connection = db;
        db.settings.set('instance.returnAllErrors', true);
        //console.log("hello from: ");
        setup(db, cb);
    });
};
