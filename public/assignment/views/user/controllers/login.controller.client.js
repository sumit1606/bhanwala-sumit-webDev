/**
 * Created by sumitbhanwala on 2/13/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.error = "";
        vm.login = login;
        function init() {

        }
        init();

        // function for invoking web service at the backend which will
        // verify whether the user exists in the database or not
        function login(userId, password) {
            var loginUser = UserService.findUserByCredentials(userId, password);
            console.log(loginUser)
            if (loginUser != null) {
                $location.url('/user/' + loginUser._id);
            }
            else {
                vm.error = "User Not found";
            }
        }

    }

})();
