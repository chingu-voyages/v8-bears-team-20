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

// order of middleware is imp bcos passport.session() depends on express-session()
app.use(require('express-session')({
    secret: 'I am good boy',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


passport.use(new LocalStrategy(User.authenticate()))
//resp for decoding and encoding the session
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// custom middleware



/*
    Routing refers to determine how an app responds to a client req to a particular endpoint
    endpoint- it is a URI and a specific HTTP req method (Get,Post)

    Each route can have 1 or more handler functions which are executed when the route is matched
*/
app.get('/', (req, res) => res.render('home'))
app.get('/register', (req, res) => res.render('register'))
app.get('/login', (req, res) => res.render('login'))
app.get('/profile', isLoggedIn, (req, res) => res.render('profile'))
app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})


app.post('/register', (req, res) => {


    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            return res.render('register')
        }

        passport.authenticate('local')(req, res, () => {
            res.redirect('/login')
        })
    })
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/secret'
}))


// custom middleware
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/");
}


app.listen(3000, () => console.log('Server has started...'))