// app.js
const express = require('express');
const bodyParser = require('body-parser');

const user = require('./routes/user.routes'); // Imports routes 
// initialize our express app
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
// let dev_db_url = 'mongodb+srv://cb20user:chingubearsteam20@ccluster-xjjpt.mongodb.net/test?retryWrites=true';
let dev_db_url = 'mongodb://localhost:27017/db';
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


