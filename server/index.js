import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import './authConfiguration.js'
import './database.js'
import users from './routes/users';
import passport from './facebookAuth.js'
//require('./facebookAuth.js')

let app = express();


app.use(bodyParser.json());
app.use('/api/users', users);
// middleware setup
app.use(webpackMiddleware(webpack(webpackConfig)));




app.use(passport.initialize());
app.use(passport.session());


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
