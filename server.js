// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
// connect to our database
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
mongoose.connect('mongodb://zainpathan:zp123456@ds111072.mlab.com:11072/bear-db');

var Bear = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use( (req, res, next) => {
    //do logging
    console.log('Something is happening....');
    next(); // make sure we go to the next routes and do not stop here
});

// test route to make sure everything is working 
// (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json( {message: 'Hooray!! Welcome to our APIs'} );
});

// more routes for our API to be added here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post( (req, res) => {
        console.log('POST request received');
        var bear = new Bear(); // create a new instance of the Bear model
        bear.name = req.body.name; // set the bears name (comes from the request)

        console.log('Trying to create a bear with name : ', req.body.name);
        // save the bear and check for errors
        bear.save( (err) => {
            if( err ) 
                res.send(err)

            console.log('Bear details saved in Mongo DB');
            res.json({
                message: 'Bear created!!'
            });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with '/api'
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port : ', port);