/**
 * Created by sumitbhanwala on 2/21/17.
 */
module.exports = function (app, listOfModel) {


    // the app instance is listening to the following end points
    app.get('/api/website/:websiteId/page' , findAllPagesForWebsite);
    app.get('/api/page/:pageId' , findPageById);
    app.delete('/api/page/:pageId',deletePage);
    app.put('/api/page/:pageId',updatePage);
    app.post('/api/website/:websiteId/page',createPage);

    var UserModel = listOfModel.UserModel;
    var WebsiteModel = listOfModel.WebsiteModel;
    var PageModel = listOfModel.PageModel;
    var WidgetModel = listOfModel.WidgetModel;

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        PageModel.findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.send(pages);
            },
            function (err) {
                res.sendStatus(404);
            }
        );
    }

    function findPageById(req ,res) {
        var pageId = req.params.pageId;
        PageModel.findPageById(pageId)
            .then(function (page) {
                    res.send(page);
                },
                function (err) {
                    res.sendStatus(404);
                }
            );
    }

    function deletePage(req ,res) {
        var pageId = req.params.pageId;
        PageModel.deletePage(pageId)
            .then(function (currPage) {
                    var pageWebsite = currPage._website;
                    var widgets = currPage.widgets;
                    console.log(widgets);
                    WidgetModel.deleteAllWidgets(widgets)
                        .then(function () {
                            return WebsiteModel.unlinkPageToWebsite(pageWebsite, currPage._id);
                        }).then(function () {
                        },
                        function(err) {
                            res.send(err);
                        });
                    res.send(200);
                },
                function(err) {
                    res.send(404 + "gee");
                });
    }

    function updatePage(req , res) {
        var page = req.body ;
        var pageId = page._id;
        PageModel.updatePage(pageId,page).then(
            function (page) {
                res.send(page);
            },
            function (err) {
                res.sendStatus(400);
            }
        );
    }

    function createPage(req, res ) {
        var page = req.body ;
        var websiteId = req.params.websiteId;
        PageModel.createPage(websiteId,page)
            .then(function (PageId) {
                return WebsiteModel.linkPageToWebsite(websiteId, PageId);
            })
            .then(function (pageId) {
                    res.send(pageId);
                },
                function(err) {
                    res.send(err);
                });
    }

}