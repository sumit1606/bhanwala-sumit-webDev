/**
 * Created by sumitbhanwala on 3/10/17.
 */
module.exports = function () {

     var api = {
         createUser: createUser ,
        // findUserById : findUserById,
        // findUserByUsername : findUserByUsername,
        // findUserByCredentials : findUserByCredentials,
     };

    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;
    //
    // var mongoose = require('mongoose');
    // var userSchema = mongoose.Schema({
    //     userName : {type :String , required: true},
    //     password : {type :String, required : true},
    //     firstName : String,
    //     lastName :  String,
    //     email : String,
    //     phone : String,
    //     dateCreated : {type : Date , default :Date.now()}
    // },{collection: 'users'});

     function createUser(user) {
         return UserModel.create(user);
     }
     // function findUserById(user) {
     //     return UserModel.create(user);
     // }
     // function findUserByUsername(user) {
     //     return UserModel.create(user);
     // }
     //
     // function findUserByCredentials(user) {
     //     return UserModel.create(user);
     // }
};