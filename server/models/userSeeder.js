// var User = require('./user');
import User from  './user';
import mongoose from 'mongoose';
import tunnel from 'tunnel-ssh';

var config = {
    username: "ubuntu",
    host: "115.146.90.170",
    agent: process.env.SSH_AUTH_SOCK,
    privateKey: require('fs').readFileSync('/Users/kenty/.ssh/gkb'),
    port: 22,
    dstPort: 27017
};

var seed = function ( username,  email,  password) {
    var user = new User ({
        username: username,
        email: email,
        password: password
    })

    var server = tunnel(config, function(error, server) {
        if (error) {
            console.log("SSH connection error: " + error);
        }
        //server.close(() => console.log("tunnel connected"));
    });

    mongoose.connect('mongodb://localhost:27017/mydb', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("database connected");
            user.save( () =>  mongoose.disconnect( () => console.log(" saved and close db") ) );
        }
    });
}



module.exports.seed = seed;

