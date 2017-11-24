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

    app.post("/api/orgs", function(req, res, next) {
            //console.log(req.session);
            //var params = _.pick(req.body, 'id');
            //console.log(req.body);

            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.org.find(req.body.params).all(function (err, orgs) {
                  if (err) return next(err);
                  var items = {};
                  var ids = [];

                  for (var i = 0; i < orgs.length; i++) {
                      o = orgs[i].serialize();
                      items[o["id"]] = o;
                      ids.push(o["id"]);
                  }

                  var result = [];

                  for (var i = 0; i < ids.length; i++) {
                    id = ids[i];
                    //console.log
                    result.push(items[id]);
                  }

/*
                  var items = orgs.map(function (o) {
                    var tmp = {};
                    tmp[o["id"]] = o;
                    return tmp;
                  });
*/
                  res.send(result);
            });
    });
}
