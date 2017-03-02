/**
 * Created by sumitbhanwala on 2/15/17.
 */
(function() {

    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", WidgetChooseController);

    function WidgetChooseController($routeParams ,WidgetService ) {

        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        var promise = WidgetService.findAllWidgetTypeToChoose();
        promise.success
                (function (currentWidgets) {
                vm.currentWidgets = currentWidgets ;
                })
            .error(function () {
                vm.currentWidgets = currentWidgets ;
            })
    }

})();