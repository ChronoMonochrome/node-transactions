// to remove
var config = require('../../libs/config');
var orm = require('orm');

/*
module.exports = function(app) {
    app.use(orm.express(config.mysql.URI, {
    	define: function (db, models, next) {
    		//models.person = db.define("person", { ... });
        db.load("../models", function (err2) {
            if (err2)
                throw err2;
            //db.sync();
        });
    		//next();
        console.log('hello from Mysql connection!');
    	}
    }));

    return app;
}
*/
