/**
 * Created by sumitbhanwala on 2/14/17.
 */
// creating a user service which will be invoked when a user hits on the login page with the valid
// credentials and if the username and password are correct than lets the user go to the profile
// page of his and all the fields of the profile populated with his credentials
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService" ,userService)
    function userService($http) {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice", email: "alice@alice.com", lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob", email: "bob@bob.com",   lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", email: "charly@charly.com", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", email: "charly@charly.com",  lastName: "Annunzi" }
        ];

        var api = {
            "user" :users,
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        }
        return api;


        function createUser(user) {
            var id= ((new Date()).getTime()).toString();
            users.push({"_id":id ,"username" : user.username,"password":user.password,"firstName": "random","email": "random@random.com",
                "lastName":"lastname"})
            return id ;
        }

        function deleteUser(user) {
            for (var u in users){
                if (users[u]._id == user._id){
                    users.splice(u,1);
                }
            }
        }

        function findUserById(userId) {
            for(var u in users)
               {
                    var user = users[u];
                    if(user._id == userId)
                        return angular.copy(user);
               }
               return null ;
        }

        function findUserByUsername(userName) {
            for(var u in users)
            {
                var user = users[u];
                if(user.username == userName)
                    return angular.copy(user);
            }
            return null ;
        }

        function findUserByCredentials(username , password) {
            // calling the api on the server tp fetch data from the server
            // rather that from the local instance
            $http.get("/api/user?username="+username+"&password="+password);
        }

        function updateUser(userId , newUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    users[u].email = newUser.email;
                    return user;
                }
            }
            return null;
        }



    }
})();
