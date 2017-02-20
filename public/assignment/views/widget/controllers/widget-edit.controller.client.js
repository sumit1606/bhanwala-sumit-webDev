/**
<<<<<<< Updated upstream
 * Created by sumitbhanwala on 2/15/17.*/
=======
 * Created by sumitbhanwala on 2/15/17.
 */
>>>>>>> Stashed changes
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
<<<<<<< Updated upstream
        vm.deleteWidget = deleteWidget ;
=======
        vm.headerSizeOptions = [1,2,3,4,5,6];


>>>>>>> Stashed changes
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
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