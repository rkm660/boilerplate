'use strict'

//DB
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
var Test = require('./models/Test.js');

mongoose.connect(dbConfig.url);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//App
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 3100);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!' });
});

//GET ALL
router.route('/test').get(function(req, res) {
    Test.find({}, function(err, test) {
        if (err)
            res.send(err);
        res.json(test)
    });
});

//INSERT
router.route('/test').post(function(req, res) {
    console.log(req.body);

    let testObject = new Test({
        test_ID: req.body.test_ID,
        test_field: req.body.test_field
    });

    testObject.save(function(err, doc) {
        if (!err) {
            console.log("created");
            res.json(doc);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//GET ONE
router.route('/test/:test_ID').get(function(req, res) {
    Test.find({ test_ID: req.params.test_ID }, function(err, doc) {
        if (err)
            res.send(err);
        res.json(doc);
    });
});

//UPDATE ONE
router.route('/test/:test_ID').put(function(req, res) {
    Test.findOne({test_ID: req.params.test_ID}, function(err, doc) {

            if (err)
                res.send(err);

            doc.test_field = req.body.test_field;  

            doc.save(function(err, updatedDoc) {
                if (err)
                    res.send(err);

                res.json(updatedDoc);
            });

        });
});

///DELETE ONE
router.route('/test/:test_ID').delete(function(req, res) {
    Test.findOneAndRemove({
        test_ID: req.params.test_ID
    }, function(err, doc) {
        if (err)
            res.send(err);
        res.json(doc);
    });
});

app.use('/api', router);

app.listen(app.get('port'), function() {

    console.log('Express server listening on port ' + app.get('port'));

});