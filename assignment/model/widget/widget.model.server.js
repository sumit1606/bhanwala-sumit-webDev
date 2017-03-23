/**
 * Created by sumitbhanwala on 3/22/17.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var q = require('q');
    var WidgetSchema = require('./widget.schema.server.js')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    var api = {
        createWidget : createWidget,
        findAllWidgetsForPage : findAllWidgetsForPage,
        findWidgetById : findWidgetById,
        updateWidget : updateWidget,
        deleteWidget : deleteWidget,
        reorderWidget : reorderWidget,
        deleteAllWidgets : deleteAllWidgets
    };

    return api;

    function deleteAllWidgets (widgets) {
        console.log(widgets);
        var q1 = q.defer();
        WidgetModel.remove({'_id': {'$in': widgets}}, function (err, result) {
            if (err) {
                q1.reject();
            }
            else {
                q1.resolve();
            }
        });
        return q1.promise;
    }

    function createWidget (pageId, newwidget) {
        var q1 = q.defer();
        newwidget._page = pageId;
        WidgetModel.findOne({_page: pageId})
            .sort('-orderIndex')
            .exec(function (err, widget) {
                if (err){
                    q1.reject();
                }
                else{
                    if (widget){
                        newwidget.orderIndex = widget.orderIndex+1;
                    }
                    else{
                        newwidget.orderIndex = parseInt(0);
                    }
                    WidgetModel.create(newwidget, function (err, createdWidget) {
                        if (err) {
                           q1.reject();
                        }
                        else {
                            q1.resolve(createdWidget._id);
                        }
                    });
                }
            });
        return q1.promise;
    }

    function findAllWidgetsForPage (pageId) {
        var q1 = q.defer();
        WidgetModel.find({_page: pageId})
            .sort('orderIndex')
            .exec( function (err, widgets) {
                if (err) {
                    q1.reject(err);
                } else {
                    q1.resolve(widgets);
                }
            });

        return q1.promise;
    }

    function findWidgetById (widgetId) {
        var q1 = q.defer();
        WidgetModel.findOne({_id: widgetId}, function (err, widget) {
            if (err) {
                q1.reject(err);
            } else {
                q1.resolve(widget);
            }
        });
        return q1.promise;
    }

    function updateWidget (widgetId, widget) {
        var q1 =  q.defer();
        WidgetModel.findOne({_id:widgetId}, function(err, Widget) {
            if (err){
                q1.reject(err);
            }
            else{
                Widget.name = widget.name || Widget.name;
                Widget.text = widget.text || Widget.text;
                Widget.placeholder = widget.placeholder || Widget.placeholder;
                Widget.description = widget.description || Widget.description;
                Widget.url = widget.url || Widget.url;
                Widget.width = widget.width || Widget.width;
                Widget.height = widget.height || Widget.height;
                Widget.rows = widget.rows || Widget.rows;
                Widget.size = widget.size || Widget.size;
                Widget.class = widget.wClass || Widget.class;
                Widget.formatted = widget.formatted;
                Widget.save(function (err, updatedPage) {
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

    function deleteWidget (widgetId) {
        var q1 = q.defer();
        WidgetModel.findOne({_id: widgetId},function (err, widget) {
            if (err){
                q1.reject();
            }
            else{
                var currentWidget= widget.orderIndex;
                var currentPageId = widget._page;
                WidgetModel.remove({_id: widgetId},
                    function (err, resp) {
                        if (err){
                            q1.reject();
                        }
                        else {
                            WidgetModel.find({_page: currentPageId,
                                    orderIndex: {$gte: currentWidget}},
                                function (err, widgets) {
                                    if(err){
                                        q1.reject();
                                    }
                                    else if (widgets.length == 0) {
                                        q1.resolve();
                                    }
                                    else
                                    {
                                        widgets.forEach(function (w) {
                                            var updatedOrder=w.orderIndex -1;
                                            WidgetModel.update({_id: w._id},
                                                {$set: {orderIndex: updatedOrder}},
                                                function (err, resp) {
                                                    if (err){
                                                        q1.reject();
                                                    }
                                                    else{
                                                        q1.resolve();
                                                    }
                                                });
                                        })
                                    }
                                });
                        }
                    });
            }
        });
        return q1.promise;
    }


    function reorderWidget (pageId, start, end) {
        var q1 = q.defer();
        WidgetModel.findOne({_page: pageId, orderIndex: start}, function (err, widget){
            if (err){
                q1.reject();
            }
            else{
                if(start < end){
                    WidgetModel.find({_page: pageId,
                            $and: [{orderIndex: {$gt: start}}, {orderIndex: {$lte: end}}]},
                        function (err, widgets) {
                            if(err){
                                q1.reject();
                            }
                            else{
                                widgets.forEach(function (w) {
                                    var updatedOrder=w.orderIndex -1;
                                    WidgetModel.update({_id: w._id},{$set: {orderIndex: updatedOrder}},
                                        function (err, resp) {
                                            if (err){
                                                q1.reject();
                                            }
                                            else{
                                                q1.resolve();
                                            }
                                        });
                                })
                                WidgetModel.update({_page: pageId, _id: widget._id},
                                    {$set: {orderIndex: end}},
                                    function (err) {
                                        if (err){
                                            q1.reject();
                                        }
                                        else{
                                            q1.resolve();
                                        }
                                    });
                            }
                        });
                }
                else{
                    WidgetModel.find({_page: pageId,
                            $and: [{orderIndex: {$gte: end}}, {orderIndex: {$lt: start}}]},
                        function (err, widgets) {
                            if(err){
                                q1.reject();
                            }
                            else{
                                widgets.forEach(function (w) {
                                    var updatedOrder=w.orderIndex +1;
                                    WidgetModel.update({_id: w._id},
                                        {$set: {orderIndex: updatedOrder}},
                                        function (err, resp) {
                                            if (err){
                                                q1.reject();
                                            }
                                            else{
                                                q1.resolve();
                                            }
                                        });
                                });
                                WidgetModel.update({_page: pageId, _id: widget._id},
                                    {$set: {orderIndex: end}},
                                    function (err) {
                                        if (err){
                                            q1.reject();
                                        }
                                        else{
                                            q1.resolve();
                                        }
                                    });
                            }
                        });
                }
            }
        })
        return q1.promise;
    }

};

