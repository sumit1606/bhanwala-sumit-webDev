/**
 * Created by sumitbhanwala on 2/21/17.
 */
module.exports = function (app) {

    var pages=[
        { "_id": "236", "name": "Post 2", "websiteId": "456", "description": "Lorem impsum" },
        { "_id": "234", "name": "Post 3", "websiteId": "456", "description": "Lorem impsum" },
        { "_id": "234", "name": "Post 4", "websiteId": "456", "description": "Lorem impsum" },
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem impsumm" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem impsum" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem impsum" }
    ];

    // the app instance is listening to the following end points
    app.get('/api/website/:websiteId/page' , findAllPagesForWebsite);
    app.get('/api/page/:pageId' , findPageById);
    app.delete('/api/page/:pageId',deletePage);
    app.put('/api/page/:pageId',updatePage);
    app.post('/api/website/:websiteId/page',createPage);

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var pg=[];
        for (var p in pages){
            if (pages[p].websiteId==websiteId){
                pg.push(pages[p])
            }
        }
        return res.send(pg);
    }

    function findPageById(req ,res) {
        var pageId = req.params.pageId;
        for (var p in pages){
            if (pages[p]._id == pageId){
                return res.send(pages[p]);
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req ,res) {
        var pageId = req.params.pageId;
        for (var p in pages){
            if (pages[p]._id == pageId){
                pages.splice(p,1);
                return res.sendStatus(202);

            }
        }
        res.sendStatus(404);
    }

    function updatePage(req , res) {
        var page = req.body ;
        var pageId = page._id;
        for (var p in pages){
            if (pages[p]._id==pageId)
            {
                pages[p].name=page.name;
                pages[p].description=page.description
               return  res.send(pages[p]);
            }
        }
        res.sendStatus(404);
    }

    function createPage(req, res ) {
        var page = req.body ;
        var websiteId = req.params.websiteId;
         var id= ((new Date()).getTime()).toString();
         pages.push({"_id":id,"name":page.name,"description":page.description,
            "websiteId":websiteId})
        res.send(page);

    }

}