
const crypto = require('crypto');

const User = require('../models/models');


//Simple version, without validation or sanitation
exports.user = function (req, res) {
    res.send({});
};

exports.register = function (req, res) {

    if(req.body.email && req.body.name && req.body.password && req.body.confirmPassword){

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
                // console.log(err);
                res.send({"message": "Error Creating User."})
            }
            res.send({"message": "User Created Successfully."})
        })
    }else {
        res.send({"message": "Some Field/s Is/Are Missing"})
    }
};


exports.login = function (req, res) {
    if (req.body.email && req.body.name && req.body.password && req.body.confirmPassword){
        user_email = req.body.email;
        password = req.body.password;
        let user = User.findOne({'email': user_email}, function(err, docs){
            if(docs == undefined){
                res.send({"status": false})
            }else{
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
            }
        });
    }else {
        res.send({"status": false})
    }
};


