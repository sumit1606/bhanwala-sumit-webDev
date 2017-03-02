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
        // verify whether the user exists in the database or not function called is UserService in the service
        // on the front end side which will call the app.js on the service which will call on the further service
        // specialized for the backend side
        function login(userId, password) {
            var promise = UserService.findUserByCredentials(userId, password);
            promise.success(function(user) {
                        if(user)
                        $location.url("/user/"+user._id);
                        else
                            vm.error = "User Not found";
            })
            promise.error(function (user) {
                vm.error = "User Not found";
            })
        }

    }

})();
