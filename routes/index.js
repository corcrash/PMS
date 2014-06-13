var express = require('express');
var router = express.Router();
var passport = require('passport');
var getProfile = require('../controllers/getProfile');
var editProfile = require('../controllers/editProfile');
var getProjects = require('../controllers/getProject');


/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login', { message: req.flash('loginMessage') });
});

router.get('/', isLoggedIn, function(req,res){
    res.render('index');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/signup', function(req, res){
    res.render('signup');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/login', function(req, res){
    res.send("login");
});

router.get('/logout', isLoggedIn, function(req, res){
    req.logout();
    res.redirect('/');
})

router.post('/getProfile', isLoggedIn, function(req, res){
        getProfile(req, res);
});

router.post('/profile', isLoggedIn, function(req,res){
        editProfile(req,res);
});

router.post('/projects', isLoggedIn, function(req, res){
        getProjects(req, res);
});

// Funkcija koja proverava da li je korisnik ulogovan
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router;
