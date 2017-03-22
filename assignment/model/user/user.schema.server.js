/**
 * Created by sumitbhanwala on 3/10/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var userSchema = mongoose.Schema({
        username : {type :String , required: true},
        password : String,
        firstName : String,
        lastName :  String,
        email : String,
        phone : String,
        dateCreated : {type : Date , default :Date.now()},
        websites :[{type :mongoose.Schema.Types.ObjectId , ref:'websiteModel'}]
    },{collection: 'user'});
// website modal is the schema that is implemented to give the
// websites that are related to this particular user
    return userSchema;
};