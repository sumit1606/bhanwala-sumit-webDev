(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite  = updateWebsite;

        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
            promise.success(function (user) {
                vm.websites = user ;
            })
            promise.error(function (user) {
                vm.websites = null ;
            })
            var promise = WebsiteService.findWebsiteById(vm.websiteId);
            promise.success(function (user) {
                vm.website = user ;
            })
            promise.error(function (user) {
                vm.website = null ;
            })
        }
        init();
        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        };

        function updateWebsite () {
            WebsiteService.updateWebsite(vm.websiteId , vm.website);
            $location.url("/user/"+vm.userId+"/website");
        };
    }
})();