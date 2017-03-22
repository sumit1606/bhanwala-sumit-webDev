/**
 * Created by sumitbhanwala on 2/21/17.
 */
module.exports = function (app ,ListOfModel) {

    // the app instance is listening to the following end points
    app.get('/api/user/:userId/website' , findAllWebsitesForUser);
    app.get('/api/website/:websiteId' , findWebsiteById);
    app.delete('/api/website/:websiteId',deleteWebsite);
    app.put('/api/website/:websiteId',updateWebsite);
    app.post('/api/user/:userId/website',createWebsite);

    var UserModel = ListOfModel.UserModel;
    var WebsiteModel = ListOfModel.WebsiteModel;
    var PageModel = ListOfModel.PageModel;
    var WidgetModel = ListOfModel.WidgetModel;


    function createWebsite (req ,res) {
         var website = req.body ;
         var userId = req.params.userId ;
        WebsiteModel.createWebsiteForUser(userId,website)
            .then(function (newWebsiteId) {
                 return UserModel.LinkWebsiteToUser(userId, newWebsiteId);
            })
            .then(function (newWebsiteId) {
                    res.send(website);
                },
                function(err) {
                    res.send(err);
                });
    }

    function updateWebsite (req ,res) {
        var website = req.body ;
        var websiteId = website._id;
        WebsiteModel.updateWebsite(websiteId,website)
            .then(function (website) {
                res.send(website);
            },
            function (err) {
                res.sendStatus(400);
            });
    }

    function findAllWebsitesForUser (req ,res) {
        console.log(req.params);
        var userId = req.params.userId;
        console.log(userId);
        WebsiteModel.findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.send(websites);
            },
            function (err) {
                res.sendStatus(400);
            });
    }

    function findWebsiteById(req , res) {
        var wid = req.params.websiteId;
        WebsiteModel.findWebsiteById(wid)
            .then(function (website) {
                res.send(website);
            },
            function (err) {
                res.sendStatus(400);
            });

    }

    function deleteWebsite(req ,res) {
    }


}