/**
 * Created by sumitbhanwala on 2/21/17.
 */
module.exports = function (app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    ];

    // the app instance is listening to the following end points
    app.get('/api/user/:userId/website' , findAllWebsitesForUser);
    app.get('/api/website/:websiteId' , findWebsiteById);
    app.delete('/api/website/:websiteId',deleteWebsite);
    app.put('/api/website/:websiteId',updateWebsite);
    app.post('/api/user/:userId/website',createWebsite);


    function createWebsite (req ,res) {
         var website = req.body ;
         var userId = req.params.userId;
         website.developerId = userId;
         website._id = ((new Date()).getTime()).toString();
         website.created = new Date();
         websites.push(website);
         res.send(website);
    }

    function updateWebsite (req ,res) {
        var website = req.body ;
        var websiteId = website._id;
         for(var w in websites) {
             var currWebsite = websites[w];
             if( websiteId === currWebsite._id ) {
                 websites[w].name = website.name;
                 websites[w].description = website.description;
                 return res.send(websites[w]);
             }
         }
         return res.send(404);
    }

    function findAllWebsitesForUser (req ,res) {
        console.log(req.params);
        var userId = req.params.userId;
        console.log(userId);
         var sites = [];
         for(var w in websites) {
             if(websites[w].developerId === userId) {
                 sites.push(websites[w]);
             }
         }
         res.send(sites);
    }

    function findWebsiteById(req , res) {
        var wid = req.params.websiteId;
         for(var w in websites) {
             if(websites[w]._id === wid) {
                 return res.send(websites[w]);
             }
         }
         return res.send(null);

    }
    function deleteWebsite(req ,res) {
        var websiteId = req.params.websiteId;
         for(var w in websites) {
             if(websites[w]._id === websiteId) {
                 websites.splice(w, 1);
                 return res.send(200);
             }
         }
         return res.send(404);
    }


}