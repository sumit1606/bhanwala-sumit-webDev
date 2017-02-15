/**
 * Created by sumitbhanwala on 2/15/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Lorem ipsum <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "widgets": widgets,
            "findAllWidgets" : findAllWidgets,
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        }

        return api;

        function findAllWidgets() {
            return widgets;
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                var widget = widgets[w];
                if( widget._id === widgetId ) {
                    var index = widgets.indexOf(widget);

                    widgets.splice(index,1)

                    return widget;
                }
            }
            return null;


        }

        function createWidget(pageNewId,newWidget) {
            var today = new Date();
            var time = today.getDate() + today.getFullYear() + today.getMonth() + today.getHours() + today.getMinutes() + today.getSeconds();
            time = time.toString();
            try {
                if (newWidget.widgetType === "HEADER") {

                    var widget_new = {
                        _id: time,
                        pageId: pageNewId,
                        size: newWidget.size,
                        text: newWidget.text,
                        widgetType: newWidget.widgetType
                    }
                }
                if (newWidget.widgetType === "Image") {

                    var widget_new = {
                        _id: time,
                        pageId: pageNewId,
                        width: newWidget.width,
                        url: newWidget.url,
                        widgetType: newWidget.widgetType
                    }
                }
                if (newWidget.widgetType === "HTML") {

                    var widget_new = {
                        _id: time,
                        pageId: pageNewId,
                        text: newWidget.text,
                        widgetType: newWidget.widgetType
                    }
                }
                if (newWidget.widgetType === "YOUTUBE") {
                    var widget_new = {
                        _id: time,
                        pageId: pageNewId,
                        width: newWidget.width,
                        url: newWidget.url,
                        widgetType: newWidget.widgetType
                    }
                }

                widgets.push(widget_new);
                return time;
            }
            catch (err){
                return null;
            }

        }




        function updateWidget(widgetId, newWidget) {
            for (var w in widgets) {

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
                    return widgets[w]
                }
            }
            return null;
        }


        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function findWidgetsByPageId(pid) {
            widgetList = []
            for(var w in widgets) {
                if(widgets[w].pageId === pid) {
                    widgetList.push(widgets[w])
                }
            }
            return widgetList;
        }
    }
})();