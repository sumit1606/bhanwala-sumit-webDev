/**
 * Created by sumitbhanwala on 2/15/17.
 */
a(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location,$timeout) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.imageWidthOptions = ["10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"];
        vm.youtubeWidthOptions = ["10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"];
        vm.headerSizeOptions = [1,2,3,4,5,6];


        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);

        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widgets/templates/editors/widget-'+type+'-editor.view.client.html';
        }
        function updateWidget() {
            var response = WidgetService.updateWidget(vm.widgetId, vm.widget);
            if (response) {
                vm.success="Widget successfully updated";

                $timeout(function () {
                    vm.success = null;
                    $location.url("/user/"
                        +vm.userId
                        +"/website/"
                        +vm.websiteId
                        +"/page/"
                        +vm.pageId
                        +"/widget");
                }, 1000);



            }
            else {
                vm.error = "Unable to update selected widget";
            }
        }
    }
})();