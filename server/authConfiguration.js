// import passport from 'passport'
// import FacebookStrategy from 'passport-facebook'
//
// const FACEBOOK_APP_ID = '739428512892184'
// const FACEBOOK_APP_SECRET = 'e06fb5633c4c05bdd98231da0670d19c'
//
// module.exports = {
//   passport.use(new FacebookStrategy({
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "http://localhost:9000/auth/facebook/callback"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       User.findOne({ facebookId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   ));
// }
