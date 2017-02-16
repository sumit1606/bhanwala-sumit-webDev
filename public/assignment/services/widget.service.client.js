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
                "url": "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_284x96dp.png"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Lorem ipsum</p>'},
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

        function createWidget(pageId,Widget) {
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

        }

        function updateWidget(widgetId, newWidget) {
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
                    return widgets[w]
                }
            }
            return null;
        }

        function findWidgetById(widgetId) {
            for(var widget in widgets) {
                if(widgets[widget]._id === widgetId) {
                    return angular.copy(widgets[widget]);
                }
            }
            return null;
        }

        function findWidgetsByPageId(pid) {
            var widgetList = []
            for(var w in widgets) {
                if(widgets[w].pageId === pid) {
                    widgetList.push(widgets[w])
                }
            }
            return widgetList;
        }
    }
})();