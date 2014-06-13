var express = require('express');
var router = express.Router();
var passport = require('passport');
var getProfile = require('../controllers/getProfile');
var editProfile = require('../controllers/editProfile');
var getProjects = require('../controllers/getProject');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { message: req.flash('loginMessage') });
});

router.route('/index').get(function(req,res){
    res.render('index');
});

router.route('/login').get(function(req,res){
    res.render('login');
});

router.route('/signup').post(passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}))
    .get(function(req, res){
        //res.send("signup");
        res.render('signup');
    });

router.route('/login').post(passport.authenticate('local-login', {
    successRedirect : '/index', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}))
    .get(function(req, res){
        res.send("login");
    });

router.route('/logout').get(function(req, res){
    req.logout();
    res.redirect('/');
})

router.route('/profile').get(function(req, res){
    //if(req.isAuthenticated())
        getProfile(req, res);
}).post(function(req,res){
        editProfile(req,res);
});

router.route('/projects').post(function(req, res){
    //if(req.isAuthenticated())
        getProjects(req, res);
});

module.exports = router;
