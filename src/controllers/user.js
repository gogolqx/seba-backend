var Config = require('../config.js');
var User = require('../models/User');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');

module.exports.login = function(req, res){
console.log("Im in login")
    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    User.findOne({email: req.body.email}, function(err, user){

        if (err) {
            res.status(500).send(err);
            return
        }

        if (!user) {
            res.status(401).send('Invalid Credentials');
            return;
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(!isMatch || err){
                res.status(401).send('Invalid Credentials');
                return;
            } else {
                res.status(200).json({token: createToken(user)});
            }
        });
    });

};

module.exports.travelerSignup = function(req, res){
    console.log("Im in traveler")
    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    if(!req.body.name){
        res.status(400).send('name required');
        return;
    }

    var user = new User();

    user.email = req.body.email;
    user.password = req.body.password;
    user.type = "traveler";
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.preferences = req.body.preferences;
    if(req.body.address) user.address = req.body.address;
    if(req.body.phone) user.phone = req.body.phone;
    if(req.body.birthday) user.birthday = req.body.birthday;

    user.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json({token: createToken(user)});
    });
};

module.exports.GuideSignup = function(req, res){
    console.log("Im in guide")
    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    if(!req.body.name){
        res.status(400).send('name required');
        return;
    }

    var user = new User();

    user.email = req.body.email;
    user.password = req.body.password;
    user.type = "guide";
    user.expertise = req.body.expertise;
    user.language = req.body.language;
    user.name = req.body.name;
    if(req.body.surname) user.surname = req.body.surname;
    if(req.body.address) user.address = req.body.address;
    if(req.body.phone) user.phone = req.body.phone;
    if(req.body.birthday) user.birthday = req.body.birthday;

    console.log("guide birthday ", user.birthday);

    user.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json({token: createToken(user)});
    });
};

// module.exports.shopSignup = function(req, res){
//
//     if(!req.body.email){
//         res.status(400).send('email required');
//         return;
//     }
//     if(!req.body.password){
//         res.status(400).send('password required');
//         return;
//     }
//     if(!req.body.shop){
//         res.status(400).send('shop details are required');
//         return;
//     }
//
//     if(!req.body.name){
//         res.status(400).send('name required');
//         return;
//     }
//
//     var user = new User();
//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     user.type = "shop";
//     if(req.body.shop.address) user.address = req.body.shop.address;
//     if(req.body.shop.phone) user.phone = req.body.shop.phone;
//
//     var shop = new Shop(req.body.shop);
//     if(!req.body.shop.type) shop.type = "No Type";
//     shop.name = req.body.name;
//
//     shop.save(function(err, shop) {
//         if (err) {
//             res.status(400).send("Problem occurred while saving the shop.");
//             return;
//         }
//         user.shop = shop;
//         user.save(function(err){
//             if (err) {
//                 shop.remove();
//                 res.status(500).send("User with provided information already exists.");
//                 return;
//             }
//             res.status(201).json({token: createToken(user)});
//         });
//     });
// };

module.exports.unregister = function(req, res) {
    req.user.remove().then(function (user) {
        res.sendStatus(200);
    }, function(err){
        res.status(500).send(err);
    });
};

module.exports.getUser = function(req, res) {
    User.findById(req.user._id).populate('traveler').exec(function(err, user) {
        if(err) {
            res.status(500).send(err);
            return;
        }
        delete user._doc.password;
        res.status(200).json(user);
        return;
    });
};

module.exports.getUserById = function(req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if(err) {
            res.sendStatus(500);
            return;
        }
        delete user._doc.password;
        res.status(200).json(user);
        return;
    });
};

module.exports.editUser = function(req, res) {
    req.user.comparePassword(req.body.old_password, function(err, isMatch) {
        if(!isMatch || err){
            res.status(422).send('Invalid Credentials');
            return;
        }
        hashPassword(req.body.new_password, function(err, hash){
            if(err) {
                res.status(500).send(err);
                return;
            }
            if(hash) req.body.password = hash;
            User.findByIdAndUpdate(req.user._id, req.body, { "new": true}, function(err, user) {
                if(err) {
                    res.status(500).send(err);
                    return;
                }
                // if(req.user.type === "shop") {
                //     var newShop = {};
                //     if(req.body.name) newShop.name = req.body.name;
                //     if(req.body.address) newShop.address = req.body.address;
                //     if(req.body.phone) newShop.phone = req.body.phone;
                //     if(req.body.type) newShop.type = req.body.shopType;
                //     Shop.findByIdAndUpdate(req.user.shop, newShop, function(err, shop){
                //         if(err) {
                //             res.status(500).send(err);
                //             return;
                //         }
                //         delete user._doc.password;
                //         res.status(200).json(user);
                //         return;
                //     })
                // }else{
                //     delete user._doc.password;
                //     res.status(200).json(user);
                //     return;
                // }
            });
        })
    });
};

function createToken(user) {
    var tokenPayload = {
        user: {
            _id: user._id,
            email: user.email,
            name: user.getUserName()
        }

    };
    return jwt.encode(tokenPayload,Config.auth.jwtSecret);
};


function hashPassword(password, cb) {
    if(!password) {
        cb(null, null);
        return;
    }
    bcrypt.genSalt(10, function(err, salt) {
        if(err){
            cb(err, null);
            return;
        }

        // hash the password using our new salt
        bcrypt.hash(password, salt, null, function (err, hash) {
            if (err) {
                cb(err, null);
                return;
            }

            // override the cleartext password with the hashed one
            cb(err, hash);
            return;
        });
    });
}