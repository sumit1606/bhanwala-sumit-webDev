/**
 * Created by sumitbhanwala on 3/10/17.
 */
module.exports = function () {

     var api = {
         createUser: createUser ,
         findUserById : findUserById,
         findUserByUsername : findUserByUsername,
         findUserByCredentials : findUserByCredentials,
         updateUser : updateUser,
         deleteUser : deleteUser
     };

    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

     function createUser(user) {
         return UserModel.create(user);
     }
      function findUserById(user) {
         return UserModel.create(user);
      }
      function findUserByUsername(user) {
          return UserModel.create(user);
      }

      function findUserByCredentials(user) {
          return UserModel.create(user);
      }
};