(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "updateWebsite" : updateWebsite
        };
        return api;

        function findWebsiteById(wid) {
            return $http.get('/api/website/'+wid);

        }
        function deleteWebsite(websiteId) {
            return $http.delete('/api/website/'+websiteId);
        }

        function updateWebsite(websiteId , website) {
            return $http.put('/api/website/'+websiteId,website);

        }

        function createWebsite(userId, website) {
            return $http.post('/api/user/'+userId+'/website',website);
        }

        function findAllWebsitesForUser(userId) {
            // the end point on which the point for finding all the websites for a particular
            // user are listening to i.e implemented on the server side of this particular user.s
            return $http.get('/api/user/'+userId+'/website');
            // it will return the controller a promise rather than the object so
            // dont forget to implement the method i.e in controller.

        }
    }
})();