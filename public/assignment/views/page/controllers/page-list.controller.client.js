/**
 * Created by sumitbhanwala on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteid = $routeParams.wid ;
        vm.userId = $routeParams.uid;
        vm.pages = PageService.findPageByWebsiteId(vm.websiteid);
    }
})();