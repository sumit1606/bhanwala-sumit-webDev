(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
            promise.success(function (user) {
                vm.websites = user ;
            })
            promise.error(function (user) {
                vm.websites = null ;
            })
        }
        init();

        function createWebsite (website) {
            WebsiteService.createWebsite(vm.userId, website);
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
            promise.success(function (user) {
                vm.websites = user ;
            })
            promise.error(function (user) {
                vm.websites = null ;
            })
            $location.url("/user/"+vm.userId+"/website");
        };
    }
})();