/**
 * Created by sumitbhanwala on 2/21/17.
 */
module.exports = function (app) {

    var multer = require('multer');


    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_284x96dp.png"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Lorem ipsum</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

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
        }
    ]

    app.get('/api/page/:pageId/widget' , findAllWidgetsForPage);
    app.get('/api/widget/alltype' , findAllWidgetTypeToChoose);
    app.get('/api/widget/:widgetId' ,findWidgetById);
    app.post('/api/page/:pageId/widget',createWidget);
    app.put('/api/widget/:widgetId',updateWidget);
    app.delete('/api/widget/:widgetId',deleteWidget);
    app.put("/page/:pageId/widget",sortWidgets);

    function sortWidgets(req,res){
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;
        var widgetsList = [];
        widgets = widgets.filter(function(current) {
            if(pageId === current.pageId) {
                widgetsList.push(current);
            }
            return widgets.indexOf(current) < 0
        });
        var widget  = widgetsList[initial];
        widgetsList.splice(initial, 1);
        widgetsList.splice(final,0, widget);
        widgets.push.apply(widgets, widgetsList);
        res.json(widgets);
    }

    function deleteWidget(req , res) {
        var widgetId  = req.params.widgetId
        for(var w in widgets) {
            var widget = widgets[w];
            if( widget._id === widgetId ) {
                var index = widgets.indexOf(widget);
                widgets.splice(index,1);
                return res.sendStatus(200);
            }
        }
        return res.sendStatus(404);

    }

    function updateWidget(req ,res) {
        var widgetId = req.params.widgetId;
        var newWidget =  req.body ;
        for (var w in widgets)
            {
                if (widgets[w]._id === widgetId) {
                    if(widgets[w].widgetType === "HEADER"){
                        widgets[w].size = newWidget.size;
                        widgets[w].text = newWidget.text;
                    }
                    if(widgets[w].widgetType === "Image"){
                        widgets[w].width = newWidget.width;
                        widgets[w].url = newWidget.url;
                    }
                    if(widgets[w].widgetType === "HTML"){
                        widgets[w].text = newWidget.text;

                    }
                    if(widgets[w].widgetType === "YOUTUBE"){
                        widgets[w].width = newWidget.width;
                        widgets[w].url = newWidget.url;
                    }
                    return res.send(widgets[w]);
                }
            }
            return res.sendStatus(404);

    }

//

    function findAllWidgetTypeToChoose(req ,res){
        res.send(currentWidgets);
    }
    function createWidget (req , res) {
        var pageId = req.params.pageId;
        var Widget =  req.body;
        var widgetid = ((new Date()).getTime()).toString();
            if (Widget.widgetType === "HEADER") {
                var widget_new = {
                    _id: widgetid ,
                    pageId: pageId,
                    size: Widget.size,
                    text: Widget.text,
                    widgetType: Widget.widgetType
                }
            }
            if (Widget.widgetType === "IMAGE") {
                var widget_new = {
                    _id: widgetid,
                    pageId: pageId,
                    width: Widget.width,
                    url: Widget.url,
                    text: Widget.title,
                    widgetType: Widget.widgetType
                }
            }

        if (Widget.widgetType === "YOUTUBE") {
            var widget_new = {
                _id: widgetid,
                pageId: pageId,
                width: Widget.width,
                url: Widget.url,
                widgetType: Widget.widgetType
            }
        }
            if (Widget.widgetType === "HTML") {

                var widget_new = {
                    _id: widgetid,
                    pageId: pageId,
                    text: Widget.text,
                    widgetType: Widget.widgetType
                }
            }
            widgets.push(widget_new);
            res.sendStatus(200);

    }

    function findWidgetById (req , res) {
        var widgetId = req.params.widgetId;
         for(var widget in widgets) {
             if(widgets[widget]._id === widgetId) {
                 return res.send((widgets[widget]));
             }
         }
         return null;
    }

    function findAllWidgetsForPage(req ,res) {
         var pid = req.params.pageId;
         var widgetList = []
         for(var w in widgets) {
             if(widgets[w].pageId === pid) {
                 widgetList.push(widgets[w])
             }
         }
         res.send(widgetList);
    }
    // default functionality which is provide by multer for
    // gaining the access of directory location and filename

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
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        console.log("for a new widhet" + widgetId);
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var destination = myFile.destination; // folder where file is saved to
        var newWidget = true ;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                newWidget = false ;
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
            }
        }
        // only execute the code below if the widget is not present and we are creating a new widget
        // for the given page
        if(newWidget)
        {
            var widgetId = ((new Date()).getTime()).toString();
            var widget_new = {
                _id: widgetId,
                pageId: pageId,
                width: width,
                url: req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename ,
                text: "random title",
                widgetType: "IMAGE"
            }
            widgets.push(widget_new);
        }
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }

}