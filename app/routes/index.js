var path = require('path');

module.exports = function(app) {
    require(path.join(__dirname, './basic.js'))(app);
    require(path.join(__dirname, './api/'))(app);
    //require(path.join(__dirname, 'routes/models.js'))(app);
}