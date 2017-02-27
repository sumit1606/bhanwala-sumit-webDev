/**
 * Created by sumitbhanwala on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location , PageService) {
        var vm = this;
        vm.websiteid = $routeParams.wid ;
        vm.pages = PageService.findPageByWebsiteId(vm.websiteid);
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams["uid"];
        console.log(vm.userId);
        vm.createPage = createPage;

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteid);
            promise.success(function (user) {
                vm.pages = user ;
            })
            promise.error(function (user) {
                vm.pages = null ;
            })
        }
        init();

        function createPage (page) {
            PageService.createPage(vm.websiteid, page);
            var promise  = PageService.findPageByWebsiteId(vm.websiteid);
            promise.success(function (user) {
                vm.pages = user ;
            })
            promise.error(function (user) {
                vm.pages = null ;
            })

            $location.url("/user/"+vm.userId+"/website/"+ vm.websiteid+ "/page");
        };
    }
})();