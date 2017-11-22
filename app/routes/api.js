var path = require('path');

var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var crypto = require('crypto');

var mongoClient = mongodb.MongoClient;
var objectId = mongodb.ObjectID;

var jsonParser = bodyParser.json();
var url = "mongodb://localhost/transactions";

module.exports = function(app) {
    app.get("/api/transactions", function(req, res) {
        //console.log(req.session);

        if (!req.session.isAuth)
            return res.status(403).send();

        mongoClient.connect(url, function(err, db) {
            try {
                db.collection("transactions").find({}).toArray(function(err, transactions) {
                    res.send(transactions)
                    db.close();
                });
            } catch (err) {
                console.log(err);
            }
        });
    });
    app.get("/api/transactions/:id", function(req, res) {

        var id;

        if (!req.session.isAuth)
            return res.status(403).send();

        if (req.params.id == undefined || !parseInt(req.params.id, 10))
            return res.status(400).send();

        id = new objectId(req.params.id);
        mongoClient.connect(url, function(err, db) {
            db.collection("transactions").findOne({
                _id: id
            }, function(err, transaction) {

                if (err) return res.status(400).send();

                res.send(transaction);
                db.close();
            });
        });
    });

    app.post("/api/transactions", jsonParser, function(req, res) {
        if (!req.session.isAuth)
            return res.status(403).send();

        if (!req.body) return res.sendStatus(400);

        var transactionAmount = req.body.transaction.amount;
        var transactionDate = req.body.transaction.date;
        var transaction = {
            amount: transactionAmount,
            date: transactionDate
        };

        mongoClient.connect(url, function(err, db) {
            db.collection("transactions").insertOne(transaction, function(err, result) {

                if (err) return res.status(400).send();

                res.send(transaction);
                db.close();
            });
        });
    });

    app.delete("/api/transactions/:id", function(req, res) {

        var id;

        if (!req.session.isAuth)
            return res.status(403).send();

        if (req.params.id == undefined || !parseInt(req.params.id, 10))
            return res.status(400).send();

        id = new objectId(req.params.id);
        mongoClient.connect(url, function(err, db) {
            db.collection("transactions").findOneAndDelete({
                _id: id
            }, function(err, result) {

                if (err) return res.status(400).send();

                var transaction = result.value;
                res.send(transaction);
                db.close();
            });
        });
    });

    app.put("/api/transactions", jsonParser, function(req, res) {

        if (!req.session.isAuth)
            return res.status(403).send();

        if (!req.body) return res.sendStatus(400);
        var id = new objectId(req.body.transaction.id);
        var transactionAmount = req.body.transaction.amount;
        var transactionDate = req.body.transaction.date;

        mongoClient.connect(url, function(err, db) {
            db.collection("transactions").findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    amount: transactionAmount,
                    date: transactionDate
                }
            }, {
                returnOriginal: false
            }, function(err, result) {

                if (err) return res.status(400).send();

                var transaction = result.value;
                res.send(transaction);
                db.close();
            });
        });
    });

    app.get("/api/users", function(req, res) {

        if (!req.session.isAuth)
            return res.status(403).send();

        mongoClient.connect(url, function(err, db) {
            try {
                db.collection("users").find({}).toArray(function(err, users) {
                    res.send(users)
                    db.close();
                });
            } catch (err) {
                console.log(err);
            }
        });
    });

    app.get("/api/users/:id", function(req, res) {
        var id;

        if (!req.session.isAuth)
            return res.status(403).send();

        if (req.params.id == undefined || !parseInt(req.params.id, 10))
            return res.status(400).send();

        id = new objectId(req.params.id);
        mongoClient.connect(url, function(err, db) {
            db.collection("users").findOne({
                _id: id
            }, function(err, user) {

                if (err) return res.status(400).send();

                res.send(user);
                db.close();
            });
        });
    });

    app.get("/api/users/user/:username", jsonParser, function(req, res) {
        var username = req.params.username;

        mongoClient.connect(url, function(err, db) {
            db.collection("users").findOne({
                username: username
            }, function(err, user) {

                if (err) return res.status(400).send();

                //console.log("username: user = " + user);

                if (user == undefined)
                    res.send(undefined);

                // TODO: adjust this when
                // capabilities handling is implemented
                if (user && !req.session.capabilities)
                    res.send({username: user.username});

                db.close();
            });
        });
    });

    app.post("/api/authenticate", function(req, res) {
        //console.log(req.body);

        var username = req.body.username;
        var password = req.body.password;

        mongoClient.connect(url, function(err, db) {
            db.collection("users").findOne({
                username: username
            }, function(err, user) {
                //console.log(user);
                if (err || user == undefined) return res.status(400).send();

                uPassword = crypto.createHmac('sha256', user.salt)
                                  .update(password).digest('hex');

                db.close();

                if (uPassword == user.password) {
                    req.session.isAuth = true;
                    res.status(200).send();
                } else res.status(403).send();

                return user;
            });
        });
    });

    app.post("/api/users", jsonParser, function(req, res) {
        if (!req.body) return res.sendStatus(400);

        var uFirstName = req.body.user.firstName;
        var uLastName = req.body.user.lastName;
        var uUsername = req.body.user.username;
	var uSalt = Math.random() + 'salt';
        var uPassword = req.body.user.password;
	uPassword = crypto.createHmac('sha256', uSalt)
		          .update(uPassword).digest('hex');
        var user = {
            firstName: uFirstName,
            lastName: uLastName,
            username: uUsername,
            salt: uSalt,
            password: uPassword
        };

        mongoClient.connect(url, function(err, db) {
            db.collection("users").findOne({
                username: uUsername
            }, function(err, result) {
                if (err) return res.status(400).send();
                // username is already taken
                if (result != undefined)
                    return res.status(422).send();
                else
                    callback(db, user);
            });
        });

        var callback = function(db, user) {
            db.collection("users").insertOne(user, function(err, result) {
                if (err) return res.status(400).send();

                res.send(user);
                db.close();
            });
        }
    });

    app.delete("/api/users/:id", function(req, res) {

        var id;

        if (!req.session.isAuth)
            return res.status(403).send();

        if (req.params.id == undefined)
            return res.status(400).send();

        id = new objectId(req.params.id);

        mongoClient.connect(url, function(err, db) {
            db.collection("users").findOneAndDelete({
                _id: id
            }, function(err, result) {

                if (err) return res.status(400).send();

                var user = result.value;
                res.send(user);
                db.close();
            });
        });
    });

    app.put("/api/users", jsonParser, function(req, res) {

        if (!req.session.isAuth)
            return res.status(403).send();

        if (!req.body) return res.sendStatus(400);

        var id = new objectId(req.body.id);

        var uFirstName = req.body.firstName;
        var uLastName = req.body.lastName;
        var uUsername = req.body.username;
        var uSalt = Math.random() + 'salt';
        var uPassword = req.body.password;
	uPassword = crypto.createHmac('sha256', uSalt)
		          .update(uPassword).digest('hex');

        mongoClient.connect(url, function(err, db) {
            db.collection("users").findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    firstName: uFirstName,
                    lastName: uLastName,
                    salt: uSalt,
                    username: uUsername,
                    password: uPassword
                }
            }, {
                returnOriginal: false
            }, function(err, result) {

                if (err) return res.status(400).send();

                var user = result.value;
                res.send(user);
                db.close();
            });
        });
    });
}
