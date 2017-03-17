import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import './authConfiguration.js'
import './database.js'
import users from './routes/users';

import passport from 'passport'
import FacebookStrategy from 'passport-facebook'
import User from './models/user.js'

const FACEBOOK_APP_ID = '739428512892184'
const FACEBOOK_APP_SECRET = 'e06fb5633c4c05bdd98231da0670d19c'



let app = express();


app.use(bodyParser.json());
app.use('/api/users', users);
// middleware setup
app.use(webpackMiddleware(webpack(webpackConfig)));




// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:9000/auth/facebook/callback",
//     enableProof: true
//   },
//   function(accessToken, refreshToken, profile, cb) {
//       process.nextTick(function() {
//
//             // find the user in the database based on their facebook id
//             User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
//
//                 // if there is an error, stop everything and return that
//                 // ie an error connecting to the database
//                 if (err)
//                     return done(err);
//
//                 // if the user is found, then log them in
//                 if (user) {
//                     return done(null, user); // user found, return that user
//                 } else {
//                     // if there is no user found with that facebook id, create them
//                     //var newUser            = new User();
//                     var facebook = {
//                       // set all of the facebook information in our user model
//                       id    : profile.id, // set the users facebook id
//                       token : accessToken, // we will save the token that facebook provides to the user
//                       name  : profile.name.givenName + ' ' + profile.name.familyName // look at the passport user profile to see how names are returned
//                       //email : profile.emails[0].value // facebook can return multiple emails so we'll take the first
//                     }
//
//                     var temp = {facebook};
//
//                     // save our user to the database
//                     User.create(temp, function(err, data) {
//                                     //callback(null, data);
//                                     console.log("wtf is happeneing");
//                                     if (err) {
//                                       console.log("error while saving");
//                                     } else {
//                                       console.log("done saving");
//                                    }
//                     });
//                 }
//
//             });
//         });
//   }
// ));


app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("success auth via fb");
    res.redirect('/');
  });




// server-slide route
app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(9000, () => console.log("Running on localhost:9000"));
