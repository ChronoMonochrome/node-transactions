var mongoose = require('mongoose');
var config = require('./config');

mongoose.set('debug', true);

mongoose.connect(config.mongoose.uri), config.mongoose.options;

module.exports = mongoose;
