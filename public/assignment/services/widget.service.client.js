/**
 * Created by sumitbhanwala on 2/15/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findAllWidgetsForPage": findAllWidgetsForPage,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findAllWidgetTypeToChoose" :findAllWidgetTypeToChoose,
            "reOrderWidgets": reOrderWidgets
        }

        return api;

        function findAllWidgetTypeToChoose() {
            console.log("it will be printed on client side");
            return $http.get('/api/widget/alltype');
        }
        
        function findAllWidgetsForPage(pageId) {
            return $http.get('/api/page/'+pageId+'/widget');
        }

        function deleteWidget(widgetId) {
            return $http.delete('/api/widget/'+ widgetId);
        }

        function createWidget(pageId,Widget) {
           return  $http.post('/api/page/'+pageId+'/widget',Widget);

        }

        function updateWidget(widgetId, newWidget) {
           return  $http.put('/api/widget/'+widgetId,newWidget);
        }

        function findWidgetById(widgetId) {
            return $http.get('/api/widget/'+widgetId);
        }

        function reOrderWidgets(initial,final,pageId){
            return $http.put("/page/"+pageId+"/widget?initial="+initial+"&final="+final);
        }

    }
})();