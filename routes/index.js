var express = require('express');
var router = express.Router();
var passport = require('passport');
//var getProfile = require('../controllers/getProfile');
var getProjects = require('../controllers/getProjects');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.route('/signup').post(passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}))
    .get(function(req, res){
        res.send("signup");
    });

router.route('/login').post(passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}))
    .get(function(req, res){
        res.send("login");
    });

//router.route('/profile').get(function(req, res){
//    if(req.isAuthenticated())
//        getProfile(req, res);
//});

router.route('/projects').post(function(req, res){
    //if(req.isAuthenticated())
        getProjects(req, res);
})

module.exports = router;
