var path = require('path');

module.exports = function(app) {
    require(path.join(__dirname, 'routes/basic.js'))(app);
    require(path.join(__dirname, 'routes/api.js'))(app);
}
