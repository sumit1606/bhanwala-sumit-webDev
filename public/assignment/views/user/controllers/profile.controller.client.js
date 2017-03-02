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
            console.log("inside delete func");
            var promise =  UserService.deleteUser(userId);
            promise
                .success(function(user) {
                    $location.url('/login');
                })
        }

        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function(user) {
                    vm.user = user;
                    vm.userId = userId ;

            })
            promise.error(function (user) {
                vm.error = "User Not found";
            })
        }
        init();
    }
})();