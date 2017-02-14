/**
 * Created by sumitbhanwala on 2/13/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
              .when("/", {
                  templateUrl: "views/user/templates/login.view.client.html",
                  controller: "LoginController",
                  controllerAs: "model"
              })
             .when("/default", {
                 templateUrl: "views/user/templates/login.view.client.html",
                 controller: "LoginController",
                controllerAs: "model"
             })
            .when("/profile/:uid",{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller : "RegisterController",
                controllerAs : "model"
            })
            //.when("/user/:uid", {
            //    templateUrl: "views/user/templates/profile.view.client.html",
           //     controller: "ProfileController",
           //     controllerAs: "model"
           // })
        // $locationProvider.html5Mode(true);
    }
})();