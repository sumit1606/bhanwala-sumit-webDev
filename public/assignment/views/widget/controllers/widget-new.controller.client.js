/**
 * Created by sumitbhanwala on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.createNewWidget = createNewWidget;
        function init() {
            vm.widget = {};
            vm.widget.widgetType = $routeParams['wigtype'];
            var promise = WidgetService.findAllWidgetTypeToChoose();
            promise.success
            (function (currentWidgets) {
                vm.currentWidgets = currentWidgets ;
            })
                .error(function () {
                    vm.currentWidgets = currentWidgets ;
                })
        }
        init();
        // redirecting to fetch the templates
        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }
        // redirecting to fetch the new widget
        function createNewWidget() {
            WidgetService.createWidget(vm.pageId, vm.widget)
            $location.url("/user/"+vm.userId+"/website/"+ vm.websiteId+ "/page/" + vm.pageId +"/widget");
        }
    }
})();