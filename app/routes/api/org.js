//var _       = require('lodash');
var arrayToTree = require('array-to-tree');

module.exports = function(app) {
/*    app.get("/api/orgs/:id", function(req, res) {
        //console.log(req.session);

        if (!req.session.isAuth)
            return res.status(403).send();

    });*/

    app.get("/api/orgs", function(req, res, next) {
            //console.log(req.session);
            //var params = _.pick(req.body, 'id');
            //console.log(req.body);

            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.org.find().all(function (err, orgs) {
                  if (err) return next(err);

                  var items = orgs.map(function (o) {
                    return o.serialize();
                  });

                  res.send(arrayToTree(items));
            });
    });

    app.post("/api/orgs", function(req, res, next) {
            //console.log(req.session);
            //var params = _.pick(req.body, 'id');
            //console.log(req.body);

            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.org.find(req.body.params).all(function (err, orgs) {
                  if (err) return next(err);

                  var items = orgs.map(function (o) {
                    return o.serialize();
                  });

                  res.send(arrayToTree(items));
            });
    });
}
