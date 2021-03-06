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

    app.get("/api/orgs/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.org.one({id: req.params.id}, function (err, org) {
                  if (err) return next(err);
                  res.status(200).send(org);
                  //console.dir(org);
                  //console.log(req.params);
            });
    });

    app.put("/api/orgs/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.org.find({id: req.params.id}).each(function (org) {
                org = org.update(req.body.params);
            }).save(function (err) {
	                if (err) return next(err);
                  res.status(200).send();
            });
    });

    app.post("/api/orgs", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();
            //console.dir(req.body);
            //res.status(200).send();
            req.models.org.create(req.body.params, function (err, org) {
                  if (err) return next(err);
                  res.status(200).send(org.serialize());
            });
    });

/*    // queryOrgs
      app.post("/api/orgs", function(req, res, next) {
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
*/
    app.delete("/api/orgs/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.org.one({id: req.params.id}, function (err, org) {
                  if (err) return next(err);
                  return org.remove(function (err) { // callback optional
                      if (!err) {
                         //console.log("removed!");
                         res.sendStatus(200);
                      } else {
                         console.log(err);
                         res.sendStatus(400);
                      }
                  });
                  //console.dir(org);
                  //console.log(req.params);
            });
    });
}
