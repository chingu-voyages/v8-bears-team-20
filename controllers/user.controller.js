
const crypto = require('crypto');

const User = require('../models/models');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.create_user = function (req, res) {
    password = req.body.password;
    salt = crypto.randomBytes(16).toString('hex');
    passwordHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

    let user = new User(
        {
            username: req.body.name,
            email: req.body.email,
            description: '',
            category: '',
            password: passwordHash,
            salt: salt
        }

    );

    user.save(function (err) {
        if (err) {
            console.log(err);
        }
        res.send('User Created successfully')
    })
};


exports.check_user = function (req, res) {
    user_email = req.body.email;
    password = req.body.password;
    let user = User.findOne({'email': user_email}, function(err, docs){
        if(err){
            res.send({"status": false})
        }else{
            // console.log(docs)
            salt = docs.salt
            passwordHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
            if(docs.password === passwordHash){
                res.send({"status": true})
            }else{
                res.send({"status": false})
            }
        }
    });
};


