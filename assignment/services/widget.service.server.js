/**
 * Created by sumitbhanwala on 2/21/17.
 */
module.exports = function (app , ListOfModel) {

    var multer = require('multer');
    var UserModel = ListOfModel.UserModel;
    var WebsiteModel = ListOfModel.WebsiteModel;
    var PageModel = ListOfModel.PageModel;
    var WidgetModel = ListOfModel.WidgetModel ;

    app.get('/api/page/:pageId/widget' , findAllWidgetsForPage);
    app.get('/api/widget/alltype' , findAllWidgetTypeToChoose);
    app.get('/api/widget/:widgetId' ,findWidgetById);
    app.post('/api/page/:pageId/widget',createWidget);
    app.put('/api/widget/:widgetId',updateWidget);
    app.delete('/api/widget/:widgetId',deleteWidget);
    app.put("/page/:pageId/widget",sortWidgets);

    var currentWidgets = [
        {
            "widgetType":"HEADER",
            "label":"Header"
        },{
            "widgetType":"IMAGE",
            "label":"Image"
        },{
            "widgetType":"YOUTUBE",
            "label":"YouTube"
        },{
            "widgetType":"HTML",
            "label":"Html"
        },
        {
            "widgetType":"TEXT",
            "label":"Text"
        }
    ]

    function sortWidgets(req,res){
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;
        WidgetModel
            .reorderWidget(pageId, initial, final)
            .then(
                function (start) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                });
    }

    function deleteWidget(req , res) {

    }

    function updateWidget(req ,res) {
        var widgetId = req.params.widgetId;
        var newWidget =  req.body ;
        WidgetModel.
        updateWidget(widgetId,newWidget).then(
            function (newWidget) {
                res.send(newWidget);
            },
            function (err) {
                res.sendStatus(500).send(err);
            }
        );
    }

    function findAllWidgetTypeToChoose(req ,res){
        res.send(currentWidgets);
    }

    function createWidget (req , res) {
        var pageId = req.params.pageId;
        var Widget =  req.body;
        WidgetModel.createWidget(pageId, Widget)
            .then(function (Widget) {
                    res.send(Widget);
                },
                function (err) {
                    res.sendStatus(400);
                });
    }

    function findWidgetById (req , res) {
        var widgetId = req.params.widgetId;
        WidgetModel.findWidgetById(widgetId).then(
            function (widget) {
                res.send(widget);
            },
            function (err) {
                res.sendStatus(400);
            }
        );
    }

    function findAllWidgetsForPage(req ,res) {
        var pageId = req.params.pageId;
        WidgetModel.findAllWidgetsForPage(pageId).then(
            function (widgets) {
                res.send(widgets);
            },
            function (err) {
                res.sendStatus(400);
            }
        );

    }

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var array = file.mimetype.split("/");
            var ext = array[array.length - 1];
            cb(null, 'image_widget' + ((new Date()).getTime()).toString() + '.' + ext);
        }
    });

    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        if (req.file) {
            var pageId = null;
            var widgetId = req.body.widgetId;
            var width = req.body.width;
            var userId = req.body.userId;
            var websiteId = req.body.websiteId;
            var myFile = req.file;
            var destination = myFile.destination;
            WidgetModel
                .findWidgetById(widgetId)
                .then(
                    function (widget) {
                        widget.width = width;
                        widget.url =  req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                        pageId = widget._page;
                        WidgetModel
                            .updateWidget(widget._id, widget)
                            .then(
                                function (updatedWidget) {
                                    res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                                },
                                function (err) {
                                    res.sendStatus(400);
                                }
                            );
                    },
                    function (error) {
                        WidgetModel.createWidget(pageId, Widget)
                            .then(function (Widget) {
                                    WidgetModel
                                        .updateWidget(Widget._id, widget)
                                        .then(
                                            function (updatedWidget) {
                                                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                                            },
                                            function (err) {
                                                res.sendStatus(400);
                                            }
                                        );
                                },
                                function (err) {
                                    res.sendStatus(400);
                                })
                    }
                );
        }
    }
}