/**
 * Created by sumitbhanwala on 2/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;
        function init() {

        }

        init();

        function createUser() {
            var promise = UserService.createUser(vm.user);
            promise.success(function (user) {
                        userId = user._id;
                        $location.url('/user/' + userId);
                    }

                )
        }

    }
})();