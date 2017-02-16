/**
 * Created by sumitbhanwala on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, WidgetService, $location,$timeout) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.imageWidthOptions = ["10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"];
        vm.youtubeWidthOptions = ["10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"];
        vm.headerSizeOptions = [1,2,3,4,5,6];
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.createNewWidget = createNewWidget;
        vm.availableWidgets = [
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

        function init() {
            vm.widget = {};
            vm.widget.widgetType = $routeParams['wigtype'];

        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function createNewWidget() {
            WidgetService.createWidget(vm.pageId, vm.widget)
            $location.url("/user/"+vm.userId+"/website/"+ vm.websiteId+ "/page/" + vm.pageId +"/widget");
        }
    }
})();