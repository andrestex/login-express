const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user.js');
const flash = require('connect-flash');
var express = require('express');
const bcrypt = require('bcrypt-nodejs');





const passport = function(passport) {

  passport.serializeUser(function(user, done) {

    done(null, user.id);

  });

  passport.deserializeUser(function(id, done) {

    User.findByPk(id, function(err, user) {

      done(err, user);

    });
  });


  // Signup
  passport.use('local-signup', new LocalStrategy({

      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {

      User.findOne({
        where: {
          'email': email
        }
      }).then(function(user) {
        if (user) {
          return done(null, false, req.flash('signupMessage', 'El email ya existe'));
        } else {

          /*
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password)
            newUser.save(function (err) {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
*/
          var newUser = new User();
          User.create({
            email: email,
            password: newUser.generateHash(password)
          }).then((user) => {
            user = user.dataValues;
            console.log(user);
            return done(null, user);
          }).catch((err) => {
            return done(err);
          });



        }
      });

    }));


  //Login
  passport.use('local-login', new LocalStrategy({

      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    function(req, email, password, done) {
      User.findOne({
        where: {
          'email': email
        }
      }).then(function(user) {

        if (!user) {
          return done(null, false, req.flash('LoginMessage', 'El usuario no existe'));
        } else if (!user.validPassword(password)) {
          return done(null, false, req.flash('LoginMessage', 'El password no es correcta'));
        } else {
          user = user.dataValues;
          return done(null, user);
        }
      }).catch(err => {
        return done(err);
      });

    }));

}

module.exports = passport;
