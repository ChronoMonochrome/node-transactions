/*angular.module('scotchTodo', ['todoController', 'todoService']);*/

(function() {
  'use strict';

  angular
    .module('ngmkdev', ['ngAnimate', 'ngCookies', 'ngMessages', 'restangular',
            'ui.router', 'ui.bootstrap', 'toastr'])
      .config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
        $stateProvider
        .state('transactions', {
          url: "/transactions",
          templateUrl: "app/main/transactions.html"
        })
        .state('settings', {
          url: "/settings",
          templateUrl: "app/settings/settings.html"
        });
        //RestangularProvider.setBaseUrl("http://localhost:4567");

        $urlRouterProvider.otherwise('/transactions');
      });
})();
