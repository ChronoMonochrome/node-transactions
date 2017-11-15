(function () {
    'use strict';

    angular
    .module('ngmkdev')
    .controller('MainController', 
    function MainController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.IsAuth = function() {
            return AuthenticationService.IsAuth();
        }
    });
})();
