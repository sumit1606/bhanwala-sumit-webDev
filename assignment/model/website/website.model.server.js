/**
 * Created by sumitbhanwala on 3/22/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var q = require('q');

    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    var api = {
        findAllWebsitesForUser : findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        createWebsiteForUser : createWebsiteForUser,
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite
    };

    return api;

    function findWebsiteById (websiteId) {
        var q1 = q.defer();
        WebsiteModel.findOne({_id: websiteId}, function (err, website) {
            if (err) {
                q1.reject(err);
            } else {
                q1.resolve(website);
            }
        });
        return q1.promise;
    }

    function findAllWebsitesForUser (userId) {
        var q1 = q.defer();
        WebsiteModel.find({_user: userId}, function (err, Listofwebsites) {
            if (err) {
                q1.reject(err);
            } else {
                q1.resolve(Listofwebsites);
            }
        });
        return q1.promise;
    }

    function createWebsiteForUser (userId, website ) {
        var q1 = q.defer();
        website._user = userId;
        WebsiteModel.create(website, function (err, newWebsite) {
            if (err) {
                q1.reject(err);
            }
            else {
                q1.resolve(newWebsite._id);
            }
        });
        return q1.promise;
    }

    function updateWebsite (websiteId, website) {
        var q1 =  q.defer();
        WebsiteModel.findOne({_id:websiteId}, function(err, Website) {
            if (err){
                q1.reject(err);
            }
            else if (Website){
                Website.name = website.name;
                Website.description = website.description;
                Website.save(function (err, newWebsite) {
                    if (err) {
                        q1.reject(err);
                    }
                    else {
                        q1.resolve(newWebsite);
                    }
                });
            }
        });
        return q1.promise;
    }

    function deleteWebsite (websiteId) {
        var deferred =  q.defer();
        WebsiteModel.findOneAndRemove({_id:websiteId}, function(err, foundWebsite) {
            if (err){
                deferred.reject(err);
            }
            else {
                console.log(foundWebsite._id);
                console.log(foundWebsite.pages);
                deferred.resolve();
            }
        });

        return deferred.promise;

    }

};