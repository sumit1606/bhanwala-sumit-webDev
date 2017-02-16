/**
 * Created by sumitbhanwala on 2/14/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService)

    function PageService() {

        var pages=[
            { "_id": "236", "name": "Post 2", "websiteId": "456", "description": "Lorem impsum" },
            { "_id": "234", "name": "Post 3", "websiteId": "456", "description": "Lorem impsum" },
            { "_id": "234", "name": "Post 4", "websiteId": "456", "description": "Lorem impsum" },
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem impsumm" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem impsum" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem impsum" }
        ];

        var api={
            "createPage":createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        }
        return api;

        function createPage(websiteId,page) {
            var id= ((new Date()).getTime()).toString();
            pages.push({"_id":id,"name":page.name,"description":page.description,
                "websiteId":websiteId})
        }

        function findPageByWebsiteId(websiteId) {
            var pg=[];
            for (var p in pages){
                if (pages[p].websiteId==websiteId){
                    pg.push(pages[p])
                }
            }
            return pg;
        }

        function findPageById(pageId) {
            for (var p in pages){
                if (pages[p]._id==pageId){
                    return angular.copy(pages[p]);
                }
            }
        }

        function updatePage(pageId, page) {
            for (var p in pages){
                if (pages[p]._id==pageId){
                    pages[p].name=page.name;
                    pages[p].description=page.description
                }
            }
        }

        function deletePage(pageId) {
            for (var p in pages){
                if (pages[p]._id == pageId){
                    pages.splice(p,1);
                }
            }
        }
    }
})();