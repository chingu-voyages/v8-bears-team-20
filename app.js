// importing packages
const express = require('express')
const mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require('./models/user')



// creates a new express application
const app = express() // app is an constant object 

// setup default mongoose connection
mongoose.connect("mongodb://localhost/mentor-mentee")// mentor-mentee is the name of db

// now we dont need to write ejs in render()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(require('express-session')({
    secret: 'I am good boy',
    resave: false,
    saveUninitialized: false
}))


passport.use(new LocalStrategy(User.authenticate()))
//resp for decoding and encoding the session
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

/*----------------------Schema-------------------*/
var mmSchema = new mongoose.Schema({
    name: String,
    subject: String
})

/* ---------------------Compiling Models------------ */
var mentor = mongoose.model("Mentor", mmSchema)

var mentee = mongoose.model("Mentor", mmSchema)

// adding a new dog
// var george = new Dog({
//     name: 'George',
//     age: 11,
//     temperament: 'Grouchy'
// })

// george.save((err, dog) => {
//     if (err) {
//         console.log('something went wrong')
//     }

//     else {
//         console.log('dog saved')
//         console.log(dog)
//         // dog is what has been saved to the database
//     }
// })

// another way using create()

// Dog.create({
//     name: 'Snowy',
//     age: 3,
//     temperament: 'Cool'
// }, (err, dog) => {
//     if (err) {
//         console.log('OH NO, ERROR!')
//         console.log(err)
//     }

//     else {
//         console.log('all the cats : ')
//         console.log(dog)
//     }
// })

// retrieve data from db
// Dog.find({}, (err, dog) => {
//     if (err) {
//         console.log('OH NO, ERROR!')
//         console.log(err)
//     }

//     else {
//         console.log('all the cats : ')
//         console.log(dog)
//     }
// })





/*
    Routing refers to determine how an app responds to a client req to a particular endpoint
    endpoint- it is a URI and a specific HTTP req method (Get,Post)

    Each route can have 1 or more handler functions which are executed when the route is matched
*/
app.get('/', (req, res) => res.render('index'))
app.get('/index', (req, res) => res.render('index'))
app.get('/register', (req, res) => res.render('register'))
app.get('/login', (req, res) => res.render('login'))
app.get('/about', (req, res) => res.render('about'))

app.post('/register', (req, res) => {


    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            return res.render('register')
        }

        passport.authenticate('local')(req, res, () => {
            res.redirect('/index')
        })
    })
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/index'
}))

app.listen(3000, () => console.log('Server has started'))