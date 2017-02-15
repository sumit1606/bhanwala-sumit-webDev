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
        vm.userId = $routeParams.uid;
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteid);
        }
        init();

        function createPage (page) {
            PageService.createPage(vm.websiteid, page);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteid);
            $location.url("/user/"+vm.userId+"/website/"+ vm.websiteid+ "/page");
        };
    }
})();