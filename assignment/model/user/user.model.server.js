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
         deleteUser : deleteUser ,
         LinkWebsiteToUser : LinkWebsiteToUser ,
         UnLinkWebsiteFromUser : UnLinkWebsiteFromUser
     };

    var mongoose = require('mongoose');
    var q = require('q');
    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    // making sure that all the database operations are working upon
    // the concept of promise and using q as the library
     function createUser(user) {
         var q1 =  q.defer() ;
         UserModel.create(user ,function (err , user) {
             if(err){
                 q1.reject();
             }
             else
             {
                 q1.resolve(user);
             }
         });
         return q1.promise;
     }

    function LinkWebsiteToUser(userId, websiteId) {
        var q1 =  q.defer();
        UserModel.findOne({_id:userId}, function(err, user) {
            if (user){
                user.websites.push(websiteId);
                user.save(function (err, User) {
                    if (err) {
                        q1.reject();
                    }
                    else {
                        q1.resolve(websiteId);
                    }
                });
            }
            else {
                q1.reject();
            }
        });
        return q1.promise;
    }

    function UnLinkWebsiteFromUser (userId, websiteId) {
        var q1 =  q.defer();
        UserModel.findOne({_id:userId}, function(err, User) {
            if (err){
                q1.reject();

            }
            else {
                User.websites.pull(websiteId);
                User.save(function (err, updatedUser) {
                    if (err) {
                        q1.reject();
                    }
                    else {
                        q1.resolve();
                    }
                });
            }
        });
        return q1.promise;
    }

      function findUserById (userId) {
          var q1 =  q.defer() ;
          UserModel
              .findOne({_id : userId} , function (err , user) {
              if(err)
              {
                  console.log("inside reject");
                  q1.reject(err);

              }
              else {
                  console.log("inside user");
                  q1.resolve(user);
              }
          });
          return q1.promise ;
      }
      function findUserByUsername(userName) {
          var q1 =  q.defer() ;
          UserModel.findOne({username : userName} , function (err , user) {
              if(err)
                  q1.reject();
              else
                  q1.resolve(user);
          });
          return q1.promise ;
      }

      function findUserByCredentials(userName , password) {
          var q1 =  q.defer() ;
          UserModel.findOne({username : userName ,password :password} , function (err , user) {
              if(err)
                  q1.reject();
              else
                  q1.resolve(user);
          });
          return q1.promise ;
      }
      
      function updateUser(userId , user) {
          var q1 =  q.defer() ;
          UserModel.findOne({_id:userId} , function (err , retuser) {
              if(err)
                  q1.reject();
              else
              {
                  retuser.username = user.username;
                  retuser.firstName = user.firstName;
                  retuser.lastName = user.lastName;
                  retuser.email = user.email;
                  retuser.save(function (err, updatedUser) {
                      if (err) {
                          q1.reject(err);
                      }
                      else {
                          q1.resolve(updatedUser);
                      }
                  });
              }
          });
          return q1.promise ;
      }
      
      function deleteUser(userId) {
          var q1 =  q.defer() ;
          UserModel.findOneAndRemove({_id : userId} , function (err , user) {
              if(err)
                  q1.reject();
              else
                  q1.resolve(user);
          });
          return q1.promise ;
      }
};