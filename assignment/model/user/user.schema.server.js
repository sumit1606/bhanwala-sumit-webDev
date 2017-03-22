/**
 * Created by sumitbhanwala on 3/10/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var userSchema = mongoose.Schema({
        username : {type :String , required: true},
        password : {type :String, required : true},
        firstName : String,
        lastName :  String,
        email : String,
        phone : String,
        dateCreated : {type : Date , default :Date.now()}
    },{collection: 'users'});

    return userSchema;
};