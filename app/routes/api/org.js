var _       = require('lodash');

module.exports = function(app) {
/*    app.get("/api/orgs/:id", function(req, res) {
        //console.log(req.session);

        if (!req.session.isAuth)
            return res.status(403).send();

    });*/

    app.get("/api/orgs/:id", function(req, res, next) {
            //console.log(req.session);
            //var params = _.pick(req.body, 'id');
            console.log(req.body);

            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.org.find({id: req.body.id}).all(function (err, ret_org) {
                  if (err) return next(err);

                  /*var items = messages.map(function (m) {
                    return m.serialize();
                  });*/

                  res.send({ org: ret_org });
            });
    });

    app.get("/api/orgs", function(req, res, next) {
            //console.log(req.session);
            //var params = _.pick(req.body, 'id');
            console.log(req.body);

            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.org.find({id: 1}).all(function (err, ret_org) {
                  if (err) return next(err);

                  /*var items = messages.map(function (m) {
                    return m.serialize();
                  });*/

                  res.send({ org: ret_org });
            });
    });
}
