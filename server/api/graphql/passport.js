const express = require('express')
const session = require('express-session')
// const uuid = require('uuid/v4')
const passport = require('passport')
const { GraphQLLocalStrategy, buildContext } = require('graphql-passport')
const User = require('../models/user')

const router = express.Router();

passport.use(
   new GraphQLLocalStrategy((email, password, done) => {
      User.findOne({
         email: email.toLowerCase()
      }, function (err, user) {
         if (err) {
            return done(err, null);
         } else {
            if (user) {
               if (!user.comparePassword(password)) {
                  return done(new Error('Incorrect password'), null);
               }
               return done(null, user);
            }
            return done(new Error('User Doesnt exist'), null);
         }
      });
   }),
);

passport.serializeUser((user, done) => {
   done(null, user._id);
});

passport.deserializeUser((_id, done) => {
   const matchingUser = User.findOne({ _id });
   done(null, matchingUser);
});


router.use(session({
   secret: process.env.EXPRESS_SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
}));

router.use(passport.initialize());
router.use(passport.session());

module.exports = router;