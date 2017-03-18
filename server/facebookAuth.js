import passport from 'passport'
import FacebookStrategy from 'passport-facebook'
import User from './models/user.js'

import FacebookTokenStrategy from 'passport-facebook-token'

const FACEBOOK_APP_ID = '739428512892184'
const FACEBOOK_APP_SECRET = 'e06fb5633c4c05bdd98231da0670d19c'


passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:9000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {

      // User.findOrCreate({facebookId: profile.id}, function (error, user) {
      //   return cb(error, user);
      // });
        //check user table for anyone with a facebook ID of profile.id
        User.findOne({
            'facebook.id': profile.id
        }, function(err, user) {
            if (err) {
                console.log("error in findOne");
                return done(err);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                user = new User({
                    //name: profile.displayName,
                    email: "dummy",
                    username: profile.username,
                    password: "dummy",
                    provider: 'facebook',
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    facebook: profile._json
                });
                user.save(function(err) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("saved successfully")
                    }
                    return done(err, user);
                });
            } else {
                //found user. Return
                console.log("found user");
                return done(err, user);
            }
        });

      // process.nextTick(function() {
      //
      //       // find the user in the database based on their facebook id
      //       User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
      //
      //           // if there is an error, stop everything and return that
      //           // ie an error connecting to the database
      //           if (err)
      //               return done(err);
      //
      //           // if the user is found, then log them in
      //           if (user) {
      //               return done(null, user); // user found, return that user
      //           } else {
      //               // if there is no user found with that facebook id, create them
      //               //var newUser            = new User();
      //               var facebook = {
      //                 // set all of the facebook information in our user model
      //                 id    : profile.id, // set the users facebook id
      //                 token : accessToken, // we will save the token that facebook provides to the user
      //                 name  : profile.name.givenName + ' ' + profile.name.familyName // look at the passport user profile to see how names are returned
      //                 //email : profile.emails[0].value // facebook can return multiple emails so we'll take the first
      //               }
      //
      //               var temp = {
      //                 facebook: facebook
      //               };
      //
      //               var temp2 = {
      //                 username: "username",
      //                 email: "email",
      //                 password: "password"
      //               };
      //
      //               // save our user to the database
      //               User.create(temp2, function(err, data) {
      //                               //callback(null, data);
      //                               console.log("wtf is happeneing");
      //                               if (err) {
      //                                 console.log("error while saving");
      //                               } else {
      //                                 console.log("done saving");
      //                              }
      //               });
      //           }
      //
      //       });
      //   });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

export default passport;
