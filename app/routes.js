// Initialize ALL routes including subfolders
var fs = require('fs');
var path = require('path');

function recursiveRoutes(app, folderName) {
    console.log(folderName);
    fs.readdirSync(folderName).forEach(function(file) {

        var fullName = path.join(folderName, file);
        var stat = fs.lstatSync(fullName);

        if (stat.isDirectory()) {
            recursiveRoutes(fullName);
        } else if (file.toLowerCase().indexOf('.js')) {
            require(fullName)(app);
            console.log("require('" + fullName + "')");
        }
    });
}

module.exports = function(app) {
    recursiveRoutes(app, path.join(__dirname, 'routes')); // Initialize it
}