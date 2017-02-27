/**
 * Created by sumitbhanwala on 2/15/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage  = updatePage;

        function init() {
            var promise  = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (user) {
                vm.pages = user ;
            })
            promise.error(function (user) {
                vm.pages = null ;
            })

            var promise  = PageService.findPageById(vm.pageId);
            promise.success(function (user) {
                vm.page = user ;
            })
            promise.error(function (user) {
                vm.page = null ;
            })

        }
        init();
        function deletePage () {
            console.log("the page id is " + vm.pageId);
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };

        function updatePage () {
            console.log("the page id is " + vm.pageId);
            console.log("the page is " + vm.page);
            PageService.updatePage(vm.pageId , vm.page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };
    }
})();