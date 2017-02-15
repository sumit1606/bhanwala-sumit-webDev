/**
 * Created by sumitbhanwala on 2/15/17.
 */
(function() {

    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", WidgetChooseController);

    function WidgetChooseController($routeParams, WidgetService) {

        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

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

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }
    }

})();