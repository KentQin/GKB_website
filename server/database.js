import mongoose from 'mongoose';
import tunnel from 'tunnel-ssh';

var config = {
    username:"ubuntu",
    host:"115.146.90.170",
    agent : process.env.SSH_AUTH_SOCK,
    privateKey:require('fs').readFileSync('C:/Users/prajith/publicKey'),
    port:22,
    dstPort:27017,
};

var server = tunnel(config, function (error, server) {
    if(error){
        console.log("SSH connection error: " + error);
    }
    mongoose.connect('mongodb://localhost:27017/mydb', function(err) {
      if (err) {
          console.log("database not conencted");
        } else {
          console.log("database connected to great");
        }
    });
});
