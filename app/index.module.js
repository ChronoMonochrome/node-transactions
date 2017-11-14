(function() {
    'use strict';

    angular
    .module('ngmkdev', ['ngAnimate', 'ngCookies', 'ngMessages', 'restangular',
        'ui.router', 'ui.bootstrap', 'toastr'
    ])
    .config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
        $stateProvider
        .state('transactions', {
            url: "/transactions",
            templateUrl: "app/main/transactions.html"
        })
        .state('settings', {
            url: "/settings",
            templateUrl: "app/settings/settings.html"
        })
        .state('login', {
            url: "/login",
            templateUrl: "app/main/login.html"
        })
        .state('register', {
            url: "/register",
            templateUrl: "app/main/register.html",
        });
        RestangularProvider.setBaseUrl("http://localhost:8080");

        $urlRouterProvider.otherwise('/login');
    })
    .run(function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    });
})();