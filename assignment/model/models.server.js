/**
 * Created by sumitbhanwala on 3/10/17.
 */
module.exports = function (app) {

    var mongoose = require('mongoose');
    console.log("this file is being loaded")
    var userSchema = mongoose.Schema({
        userName : {type :String , required: true},
        password : {type :String, required : true},
        firstName : String,
        lastName :  String,
        email : String,
        phone : String,
        dateCreated : {type : Date , default :Date.now()}
    });

    var userModel = mongoose.model(userModel , userSchema);

    userModel.create({userName :'sumit' , password : 'sumit'});
}