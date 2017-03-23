/**
 * Created by sumitbhanwala on 2/15/17.*/
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        var widget ;
        function init () {
            vm.widgetId = $routeParams.wgid;
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise.success(function (widget) {
                vm.widget = widget ;
            })
                .error(function (widget) {
                console.log("error");
                })
        }
        init();
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deleteWidget = deleteWidget ;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;

        function getEditorTemplateUrl(type) {
            if(type ) {
                return 'views/widget/templates/editors/widget-' + type + '-editor.view.client.html';
            }
        }
        function updateWidget() {
            WidgetService.updateWidget(vm.widgetId, vm.widget);
            $location.url("/user/"+vm.userId+"/website/"+ vm.websiteId+ "/page/" + vm.pageId +"/widget");
        }
        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+ vm.websiteId+ "/page/" + vm.pageId +"/widget");
        }
    }
})();