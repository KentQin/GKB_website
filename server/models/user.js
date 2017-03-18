import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate'

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    provider: {type: String},
    facebook: {type: Object}
})
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
