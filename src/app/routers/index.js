const {
  Router
} = require('express');
const router = Router();
const flash = require('connect-flash');
const mysqlConnection = require('C:/Users/atexeira/Documents/Node/login_express/src/config/database.js');
const passport = require('passport');
require('C:/Users/atexeira/Documents/Node/login_express/src/config/passport.js')(passport);


router.get('/', (req, res) => {

  res.render('index.ejs');

});

router.get('/login', (req, res) => {

  res.render('login.ejs', {
    message: req.flash('LoginMessage')
  });

});

router.get('/signup', (req, res) => {

  res.render('signup.ejs', {
    message: req.flash('signupMessage')
  });

});

router.post('/signup', passport.authenticate('local-signup', {

  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true

}));


router.post('/login', passport.authenticate('local-login', {

  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true

}));


router.get('/profile', (req, res) => {

  res.render('profile.ejs', {
  user: req.user,
  });
});


/*
router.get('/logout', (req, res) => {

  req.logout();
  res.redirect('/');
});

/*
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){

    return next();

  }

  return res.redirect('/')

}
*/

module.exports = router;
