"use strict";

const jwt    = require('jsonwebtoken');

const config = require ('../config');


const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.status(200).send(200);
    }
    else {
        next();
    }
};

const checkAuthentication = (req, res, next) => {
    // check header or url parameters or post parameters for token
    let token = ""
    
    if(req.headers.authorization) {
        
        token = req.headers.authorization.split("JWT ")[1];
    }
    if (!token)
        return res.status(401).send({
            error: 'Unauthorized',
            message: 'No token provided in the request'
        });

    // verifies secret and checks exp
    jwt.verify(token, config.JwtSecret, (err, decoded) => {

        if (err) return res.status(401).send({
            error: 'Unauthorized',
            message: 'Failed to authenticate token.'
        });
        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        console.log(decoded.role);
        next();
    });
};
const checkTravellerAuthentication = (req, res, next) => {
    // check header or url parameters or post parameters for token
    let token = ""
    if(req.headers.authorization) {
        token = req.headers.authorization.split("JWT ")[1];
    }
    if (!token)
        return res.status(401).send({
            error: 'Unauthorized',
            message: 'No token provided in the request'
        });
        
    // verifies secret and checks exp
    jwt.verify(token, config.JwtSecret, (err, decoded) => {
        
        if (err) return res.status(401).send({
            error: 'Unauthorized',
            message: 'Failed to authenticate token.'
        });
        if (decoded.role != "traveler") return res.status(401).send({
            error: 'The User is not a traveler',
            message: 'Only access for Traveler '
        });
        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        console.log(decoded.role);
        console.log(decoded.id);
        next();
    });
};

const checkGuideAuthentication =  (req, res, next) => {

    // check header or url parameters or post parameters for token
    let token = ""

    const urlUsername = req.params.username;
    
    if(req.headers.authorization) {
        token = req.headers.authorization.split("JWT ")[1];
    }

    if (!token)
        return res.status(401).send({
            error: 'Unauthorized',
            message: 'No token provided in the request'
        });

    // verifies secret and checks exp
      jwt.verify(token, config.JwtSecret, (err, decoded) => {
        //check if this user is a guide
        if (err) return res.status(401).send({
            error: 'Unauthorized',
            message: 'Failed to authenticate token.'
        });
        if (decoded.role != "guide") return res.status(401).send({
            error: 'The User is not a guide',
            message: 'Only access for Guide '
        });
        //check if this user is the right guide that belongs to this url
        if (decoded.username != urlUsername) return res.status(401).send({
            error: ' Wrong Guide',
            message: 'This Guide does not match this corresponding guides page.'
        });

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
};

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500);
    res.render('error', { error: err })
};


module.exports = {
    allowCrossDomain,
    checkAuthentication,
    checkTravellerAuthentication,
    checkGuideAuthentication,
    errorHandler
};