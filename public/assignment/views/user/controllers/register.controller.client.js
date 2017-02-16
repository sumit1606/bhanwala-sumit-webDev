/**
 * Created by sumitbhanwala on 2/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController" ,RegisterController);

    function RegisterController($location , UserService) {
        var vm = this ;
        vm.createUser = createUser ;
        function init() {

        }
        init();

        function createUser() {
            var user_id = UserService.createUser(vm.user);
            $location.url('/user/' + user_id);
        }

    }

})();