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
        var promise = PageService.findPageByWebsiteId(vm.websiteid);
        promise.success(function (pages) {
            vm.pages = pages;
        })
        promise.error(function (pages) {
            Console.log("was unable to retrive pages due to some issues");
        })
    }
})();