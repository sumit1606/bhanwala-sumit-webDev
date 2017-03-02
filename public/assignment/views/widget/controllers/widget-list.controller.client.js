/**
 * Created by sumitbhanwala on 2/15/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgets ;
        vm.reOrderWidgets = reOrderWidgets;
        var promise = WidgetService.findAllWidgetsForPage(vm.pageId);
        promise.success(function (widgets) {
                vm.widgets = widgets ;
            })
        promise.error(function (widgets) {
                vm.widgets = widgets ;
            })

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function reOrderWidgets(initial,final){
             var promise =    WidgetService.reOrderWidgets(initial,final,vm.pageId) ;
                promise.success(function () {

                })
                .error(function () {

            })
        }
    }
})();