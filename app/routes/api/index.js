var path = require('path');

module.exports = function(app) {
    require(path.join(__dirname, './user.js'))(app);
    require(path.join(__dirname, './transactions.js'))(app);
    require(path.join(__dirname, './org.js'))(app);
    require(path.join(__dirname, './survey.js'))(app);
}
