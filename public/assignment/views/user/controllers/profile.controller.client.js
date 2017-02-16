/**
 * Created by sumitbhanwala on 2/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService ,$location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.deleteUser = deleteUser ;
        vm.update = function (newUser) {

            var user = UserService.updateUser(userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        };

        function deleteUser() {
            UserService.deleteUser(vm.user);
            $location.url('/login');
        }

        var user = UserService.findUserById(userId);
        vm.user = user;
        vm.userId = userId ;
    }

})();