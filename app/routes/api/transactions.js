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
}