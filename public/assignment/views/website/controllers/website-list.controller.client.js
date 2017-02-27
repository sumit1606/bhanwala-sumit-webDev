(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid ;
        var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
        promise.success(function (user) {
           vm.websites = user ;
        })
        promise.error(function (user) {
            vm.websites = null ;
        })
    }
})();