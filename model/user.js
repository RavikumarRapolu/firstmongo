var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema  = new mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        email:String,
        phone:Number
    });
var User = mongoose.model('User',userSchema);

module.exports = User;