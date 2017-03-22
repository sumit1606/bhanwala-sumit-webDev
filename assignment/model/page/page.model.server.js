/**
 * Created by sumitbhanwala on 3/22/17.
 */
module.exports = function () {


    var mongoose = require('mongoose');
    var q = require('q');
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    var api = {
        createPage : createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage : updatePage,
        deletePage : deletePage,
        linkWidgetToPage : linkWidgetToPage,
        unLinkWidgetFromPage: unLinkWidgetFromPage,
        deleteBulkPages : deleteBulkPages
    };

    return api;

    function deleteBulkPages (pages) {

    }

    function unLinkWidgetFromPage(pageId, widgetId) {
        var q1=q.defer();
        PageModel.update({_id: pageId}, {$pull: {widgets: widgetId}},
            function (err, result) {
                if (err){
                    q1.reject();
                }
                else {
                    q1.resolve(result);
                }
            });
        return q1.promise;
    }


    function linkWidgetToPage (pageId , widgetId) {
        var q1 =  q.defer();
        PageModel.findOne({_id : pageId}, function(err, currPage) {
            if (err){
                q1.reject();
            }
            else {
                currPage.widgets.push(widgetId);
                currPage.save(function (err, updatedPage) {
                    if (err) {
                        q1.reject();
                    }
                    else {
                        q1.resolve(widgetId);
                    }
                });
            }
        });
        return q1.promise;
    }

    function createPage (websiteId, page) {
        var q1 = q.defer();
        page._website = websiteId;
                PageModel.create(page, function (err, newPage) {
                    if (err) {
                        q1.reject();
                    }
                    else {
                        q1.resolve(newPage._id);
                    }
                });
        return q1.promise;
    }

    function findAllPagesForWebsite (websiteId) {
        var q1 = q.defer();
        PageModel.find({_website: websiteId}, function (err, pages) {
            if (err) {
                q1.reject(err);
            } else {
                q1.resolve(pages);
            }
        });
        return q1.promise;
    }

    function findPageById (pageId) {
        var q1 = q.defer();
        PageModel.findOne({_id: pageId}, function (err, page) {
            if (err) {
                q1.reject(err);
            } else {
                q1.resolve(page);
            }
        });
        return q1.promise;
    }

    function updatePage (pageId, page) {
        var q1 =  q.defer();
        PageModel.findOne({_id:pageId}, function(err, Page) {
            if (err){
                deferred.reject(err);
            }
            else {
                Page.name = page.name;
                Page.title = page.title;
                Page.save(function (err, updatedPage) {
                    if (err) {
                        q1.reject(err);
                    }
                    else {
                        q1.resolve(updatedPage);
                    }
                });
            }
        });
        return q1.promise;
    }

    function deletePage (pageId) {
        var q1 =  q.defer();
        PageModel.remove({_id:pageId}, function(err, Page) {
            if (err){
                q1.reject(err);
            }
            else {
                q1.resolve();
            }
        });
        return q1.promise;
    }
};