
module.exports = function(app) {
    app.get("/api/surveys", function(req, res, next) {
            //console.log(req.session);
            //var params = _.pick(req.body, 'id');
            //console.log(req.body);

            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.survey.find().all(function (err, surveys) {
                  if (err) return next(err);

                  var items = surveys.map(function (o) {
                    return o.serialize();
                  });

                  res.send(items);
            });
    });

    app.get("/api/surveys/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.survey.one({id: req.params.id}, function (err, survey) {
                  if (err) return next(err);
                  res.status(200).send(survey);
                  //console.dir(survey);
                  //console.log(req.params);
            });
    });

    app.put("/api/surveys/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.survey.find({id: req.params.id}).each(function (survey) {
                survey = survey.update(req.body.params);
            }).save(function (err) {
                  if (err) return next(err);
                  res.status(200).send();
            });
    });

    app.post("/api/surveys", function(req, res, next) {
      if (!req.session.isAuth)
          return res.status(403).send();
      //console.dir(req.body);
      //res.status(200).send();
      req.models.survey.create(req.body.params, function (err, survey) {
            if (err) return next(err);
            res.status(200).send(survey.serialize());
      });
    });

    app.delete("/api/surveys/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.survey.one({id: req.params.id}, function (err, survey) {
                  if (err) return next(err);
                  return survey.remove(function (err) { // callback optional
                      if (!err) {
                         //console.log("removed!");
                         res.sendStatus(200);
                      } else {
                         console.log(err);
                         res.sendStatus(400);
                      }
                  });
                  //console.dir(survey);
                  //console.log(req.params);
            });
    });

    app.get("/api/parameterTypes", function(req, res, next) {
            //console.log(req.session);
            //var params = _.pick(req.body, 'id');
            //console.log(req.body);

            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterType.find().all(function (err, parameterTypes) {
                  if (err) return next(err);

                  var items = parameterTypes.map(function (o) {
                    return o.serialize();
                  });

                  res.send(items);
            });
    });

    app.get("/api/parameterTypes/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterType.one({id: req.params.id}, function (err, parameterType) {
                  if (err) return next(err);
                  res.status(200).send(parameterType);
                  //console.dir(parameterType);
                  //console.log(req.params);
            });
    });

    app.put("/api/parameterTypes/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterType.find({id: req.params.id}).each(function (parameterType) {
                parameterType = parameterType.update(req.body.params);
            }).save(function (err) {
                  if (err) return next(err);
                  res.status(200).send();
            });
    });

    app.post("/api/parameterTypes", function(req, res, next) {
      if (!req.session.isAuth)
          return res.status(403).send();
      //console.dir(req.body);
      //res.status(200).send();
      req.models.parameterType.create(req.body.params, function (err, parameterType) {
            if (err) return next(err);
            res.status(200).send(parameterType.serialize());
      });
    });

    app.delete("/api/parameterTypes/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterType.one({id: req.params.id}, function (err, parameterType) {
                  if (err) return next(err);
                  return parameterType.remove(function (err) { // callback optional
                      if (!err) {
                         //console.log("removed!");
                         res.sendStatus(200);
                      } else {
                         console.log(err);
                         res.sendStatus(400);
                      }
                  });
                  //console.dir(parameterType);
                  //console.log(req.params);
            });
    });

    app.get("/api/parameterForms", function(req, res, next) {
            //console.log(req.session);
            //var params = _.pick(req.body, 'id');
            //console.log(req.body);

            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterForm.find().all(function (err, parameterForms) {
                  if (err) return next(err);

                  var items = parameterForms.map(function (o) {
                    return o.serialize();
                  });

                  res.send(items);
            });
    });

    app.get("/api/parameterForms/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterForm.one({id: req.params.id}, function (err, parameterForm) {
                  if (err) return next(err);
                  res.status(200).send(parameterForm);
                  //console.dir(parameterForm);
                  //console.log(req.params);
            });
    });

    app.put("/api/parameterForms/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterForm.find({id: req.params.id}).each(function (parameterForm) {
                parameterForm = parameterForm.update(req.body.params);
            }).save(function (err) {
                  if (err) return next(err);
                  res.status(200).send();
            });
    });

    app.post("/api/parameterForms", function(req, res, next) {
      if (!req.session.isAuth)
          return res.status(403).send();
      //console.dir(req.body);
      //res.status(200).send();
      req.models.parameterForm.create(req.body.params, function (err, parameterForm) {
            if (err) return next(err);
            res.status(200).send(parameterForm.serialize());
      });
    });

    app.delete("/api/parameterForms/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterForm.one({id: req.params.id}, function (err, parameterForm) {
                  if (err) return next(err);
                  return parameterForm.remove(function (err) { // callback optional
                      if (!err) {
                         //console.log("removed!");
                         res.sendStatus(200);
                      } else {
                         console.log(err);
                         res.sendStatus(400);
                      }
                  });
                  //console.dir(parameterForm);
                  //console.log(req.params);
            });
    });

    app.get("/api/parameterGroups", function(req, res, next) {
            //console.log(req.session);
            //var params = _.pick(req.body, 'id');
            //console.log(req.body);

            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterGroup.find().all(function (err, parameterGroups) {
                  if (err) return next(err);

                  var items = parameterGroups.map(function (o) {
                    return o.serialize();
                  });

                  res.send(items);
            });
    });

    app.get("/api/parameterGroups/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterGroup.one({id: req.params.id}, function (err, parameterGroup) {
                  if (err) return next(err);
                  res.status(200).send(parameterGroup);
                  //console.dir(parameterGroup);
                  //console.log(req.params);
            });
    });

    app.put("/api/parameterGroups/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterGroup.find({id: req.params.id}).each(function (parameterGroup) {
                parameterGroup = parameterGroup.update(req.body.params);
            }).save(function (err) {
                  if (err) return next(err);
                  res.status(200).send();
            });
    });

    app.post("/api/parameterGroups", function(req, res, next) {
      if (!req.session.isAuth)
          return res.status(403).send();
      //console.dir(req.body);
      //res.status(200).send();
      req.models.parameterGroup.create(req.body.params, function (err, parameterGroup) {
            if (err) return next(err);
            res.status(200).send(parameterGroup.serialize());
      });
    });

    app.delete("/api/parameterGroups/:id", function(req, res, next) {
            if (!req.session.isAuth)
                return res.status(403).send();

            req.models.parameterGroup.one({id: req.params.id}, function (err, parameterGroup) {
                  if (err) return next(err);
                  return parameterGroup.remove(function (err) { // callback optional
                      if (!err) {
                         //console.log("removed!");
                         res.sendStatus(200);
                      } else {
                         console.log(err);
                         res.sendStatus(400);
                      }
                  });
                  //console.dir(parameterGroup);
                  //console.log(req.params);
            });
    });
}
