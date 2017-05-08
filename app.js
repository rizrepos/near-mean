// importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

var path = require('path');

var app = express();

const route = require('./routes/route');

// connect to mongo db
mongoose.connect('mongodb://localhost:27017/nearestshop');

const { shops } = mongoose.connection.collections;
shops.ensureIndex({ 'geo.coordinates': '2dsphere' });


// on connection
mongoose.connection.on('connected', () => {
    console.log('connected to mongo db');
});

// on connection
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log(err)
    }
});

// port number
const port = 9000;


// adding middleware
app.use(cors());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

app.listen(port, () => {
    console.log('server started at 9000');
});