import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';

import users from './routes/users';

let app = express();


app.use(bodyParser.json());
app.use('/api/users', users);
// middleware setup
app.use(webpackMiddleware(webpack(webpackConfig)));

// server-slide route
app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => console.log("Running on localhost:3000"));