/**
 * Created by sumitbhanwala on 2/21/17.
 */
module.exports = function (app ,listOfModel) {

    // find User is a generic function which will in turn call
    // findUserByCredentails and findUserByUserName
    // server is listening to the below mentioned end points
    app.post("/api/user" ,createUser);
    app.get("/api/user" ,findUser);
    app.get("/api/user/:userId" ,findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

// maybe implement the concept of q later on here to see the
 // real usage of the q
    function deleteUser (req ,res) {
        var userId = req.params.userId;
        listOfModel.UserModel
            .deleteUser(userId)
            .then(function () {
                    res.send("OK");
                },
                function(err) {
                    return null;
                });
    }

      function createUser(req,res) {
        var user = req.body;
          listOfModel.UserModel
              .createUser(user)
              .then(function(user) {
                  res.send(user);
              }, function (error) {
                  res.sendStatus(500).send(error);
              });
      }

    function findUserByCredentials (req ,res) {
        var queryParams = req.query;
        var userName = queryParams.username;
        var passWord = queryParams.password;
        console.log("the username is" + userName);
        console.log("the password is" + passWord);
        listOfModel.UserModel
            .findUserByCredentials(userName, passWord)
            .then(function (user) {
                res.send(user);
            } , function (err) {
            console.log("the particular user not found according to the given username and password");
            res.send(400);
        });
    }

    function findUser(req ,res) {
        var queryParams = req.query;
        var userName = queryParams.username;
        var passWord = queryParams.password;
        if(userName && passWord)
        {
            return findUserByCredentials(req,res);
        }
        else if(userName)
        {
            return findUserByUserName(req,res);
        }
    }

    function findUserByUserName(req ,res) {
        var queryParams = req.query;
        var userName = queryParams.username;
        listOfModel.UserModel
            .findUserByUsername(userName)
            .then(function (user) {
                res.send(user);
            }, function (err) {
            console.log("the particular user not found according to the given username and password");
            res.send(400);
        });
    }

    function findUserById (req ,res) {
        var userId = req.params.userId;
        listOfModel.UserModel
            .findUserById(userId)
            .then(function (user) {
                console.log(user);
                res.send(user);
            }, function (err) {
            console.log("the particular user not found according to the given username and password");
            res.send(400);
        });
    }

    function updateUser (req ,res) {
        var userId = req.params.userId;
        var newUser = req.body ;
        listOfModel.UserModel
            .updateUser(userId, newUser)
            .then(function (user) {
                res.send(user);
            }, function (err) {
            console.log(err);
            res.send(400);
        });
    }
}