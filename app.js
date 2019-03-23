// app.js
const express = require('express');
const session = require('express-session');
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
// mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(session({
    secret: '7c5668ef4599b6608c28e6010c3bd2bc4a232761743e760055f310bf5223575',
    resave: true,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', user);


let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port no ' + port);
});


