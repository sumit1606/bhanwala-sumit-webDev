/**
 * Created by sumitbhanwala on 2/21/17.
 */
module.exports = function (app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice", email: "alice@alice.com", lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob", email: "bob@bob.com",   lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", email: "charly@charly.com", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", email: "charly@charly.com",  lastName: "Annunzi" }
    ];
    // find User is a generic function which will in turn call
    // findUserByCredentails and findUserByUserName
    // server is listening to the below mentioned end points
    app.post("/api/user" ,createUser);
    app.get("/api/user" ,findUser);
    app.get("/api/user/:userId" ,findUserById);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    function deleteUser (req ,res) {
        var userId = req.params.userId;
        for(var user in users)
        {
            if(users[user]._id == userId)
            {
                console.log("user before splicing");
                console.log(users);
                users.splice(user , 1);
                console.log("users after splicing");
                console.log(users);
                return res.send(200);
            }
        }
        return res.send(404);
    }

    function createUser(req , res) {
        var body = req.body ;
        var user = body.username;
        var pass = body.password;
        var id= ((new Date()).getTime()).toString();
        users.push({"_id":id ,"username" : user,"password": pass,"firstName": "random","email": "random@random.com",
                "lastName":"lastname"});
        for(var user in users)
        {
            if(users[user]._id == id)
            {
                return res.send((users[user]));
            }
        }
    }

    function findUserByCredentials (req ,res) {
        var queryParams = req.query;
        var userName = queryParams.username;
        var passWord = queryParams.password;
        for(var user in users)
        {
            if(users[user].username == userName && users[user].password == passWord)
            {
                return res.send((users[user]));
            }
        }
        return res.send(null);
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
        for(var user in users)
        {
            if(users[user].username == userName)
            {
                return res.send((users[user]));
            }
        }
        return res.send(null);
    }

    function findUserById (req ,res) {
        var userName = req.params.userId;
        for(var user in users)
        {
            if(users[user]._id == userName)
            {
                return res.send((users[user]));
            }
        }
        return res.send(null);
    }

    function updateUser (req ,res) {
        var userId = req.params.userId;
        var newUser = req.body ;
        for(var user in users)
        {
            if(users[user]._id == userId)
            {
                users[user].firstName = newUser.firstName;
                users[user].lastName = newUser.lastName;
                return res.send(users[user]);
            }
        }
        return res.send(null);
    }
}