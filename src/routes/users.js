module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('../controllers/user');
    var router = require('express').Router();


    router.route('/')
        .get(passport.authenticate('jwt', {session: false}), userController.getUser)
        .put(passport.authenticate('jwt', {session: false}), userController.editUser);
    router.post('/login', userController.login);
    router.post('/signup/traveler', userController.travelerSignup);
    router.post('/signup/guide', userController.GuideSignup);
    router.post('/unregister', passport.authenticate('jwt', {session: false}),userController.unregister);
    router.route('/:user_id')
        .get(passport.authenticate('jwt', {session: false}), userController.getUserById);

    return router;

}