"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');
const config     = require('../config');
const User  = require('../models/User');
const Guide = require('../models/Guide');
const Traveler = require('../models/Traveller');
const check_register_property  = function(req,res){ 
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a password property'
});

if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a username property'
});
if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
    error: 'Bad Request',
    message: 'The request body must contain a email property'
});
const user = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});
return user;
}


const login = async(req,res) => {
    console.log(req);
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });
    await User.findOne({username: req.body.username}).exec()
        .then(user => {

            // check if the password is valid
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) return res.status(401).send({token: null });

            // if user is found and password is valid
            // create a token
            const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            console.log("token is given")
            res.status(200).json({token: token});

        })
        .catch(error => res.status(404).json({
            error: 'User Not Found',
            message: error.message
        }));

};


const register_guide = async (req,res) => {
    const user = check_register_property(req,res);
    console.log("you are registering as a guide")
    user.role = "guide";
    var guide = null;
    await User.create(user)
    
     .then(user   => {
        guide = {
            user_id: user._id,
            username: user.username,
            email: user.email
            }
            Guide.create(guide);
            
              // if user is registered without errors, create a token
            const token = jwt.sign({ id: user._id,  username: user.username, role: user.role }, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            
            res.status(200).json({token: token});
        })
        .catch(error => {          
            if(error.code == 11000) {
                res.status(400).json({
                    error: 'User exists',
                    message: error.message
                })
            }
            else{             
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });
        
    }
       
const register_traveler = async(req,res) => {
    console.log("register a traveler...");
    const user = check_register_property(req,res);
    var traveler = null;
    user.role = "traveler";
    await User.create(user)
            .then(user => {
                traveler = {
                    user_id: user._id,
                    username: user.username,
                    email: user.email
                    }
                    Traveler.create(traveler);
                    console.log(traveler);
                    // if user is registered without errors, create a token
                const token = jwt.sign({ id: user._id,  username: user.username, role: user.role  }, config.JwtSecret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).json({token: token});
            })
            .catch(error => {          
                if(error.code == 11000) {
                    res.status(400).json({
                        error: 'User exists',
                        message: error.message
                    })
                }
                else{             
                    res.status(500).json({
                        error: 'Internal server error',
                        message: error.message
                    })
                }
            });
};


    
const me = (req, res) => {
    User.findById(req.userId).select('username').exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};


module.exports = {
    login,
    register_guide,
    register_traveler,
    logout,
    me
};