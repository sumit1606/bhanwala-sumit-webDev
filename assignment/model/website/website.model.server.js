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
        deleteWebsite : deleteWebsite,
        linkPageToWebsite : linkPageToWebsite,
        unlinkPageToWebsite : unlinkPageToWebsite,
        deleteAllWebsites : deleteAllWebsites
    };

    return api;

    function deleteAllWebsites (websites) {
        var q1 =  q.defer();
        WebsiteModel.find({'_id': {'$in': websites}}, function (err, foundWebsites) {
            if (err) {
                q1.reject();
            }
            else if (foundWebsites && foundWebsites.length > 0)  {
                var pages = [];
                foundWebsites.forEach(
                    function (website) {
                        pages = pages.concat(website.pages);
                        website.remove();
                    }
                );
                q1.resolve(pages);
            }
            else {
                q1.resolve([]);
            }

        });
        return q1.promise;
    }

    function linkPageToWebsite(wesbiteId, pageId) {
        var q1 =  q.defer();
        WebsiteModel.findOne({_id:wesbiteId}, function(err, Website) {
            if (err){
                q1.reject(err);
            }
            else {
                Website.pages.push(pageId);
                Website.save(function (err, upWebsite) {
                    if (err) {
                        q1.reject();
                    }
                    else {
                        q1.resolve(pageId);
                    }
                });
            }
        });
        return q1.promise;
    }

    function unlinkPageToWebsite(wesbiteId, pageId) {
        var q1 =  q.defer();
        WebsiteModel.findOne({_id:websiteId}, function(err, currWebsite) {
            if (err){
                q1.reject();
            }
            else {
                currWebsite.pages.pull(pageId);
                currWebsite.save(function (err, updatedWebsite) {
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
        var q1 =  q.defer();
        WebsiteModel.findOneAndRemove({_id:websiteId}, function(err, Website) {
            if (err){
                q1.reject(err);
            }
            else {
                q1.resolve(Website);
            }
        });

        return q1.promise;

    }

};