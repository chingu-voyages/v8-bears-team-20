// app.js
const express = require('express');
const bodyParser = require('body-parser');
const global = require('./global')

const user = require('./routes/user.routes'); // Imports routes 
// initialize our express app
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = global.mongo_url;
const mongoDB = dev_db_url;
mongoose.connect(mongoDB);
console.log("connecting...")
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users', user);

let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port no ' + port);
});


