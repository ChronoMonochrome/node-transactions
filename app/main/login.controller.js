(function () {
    'use strict';

    angular
    .module('ngmkdev')
    .controller('LoginController', 
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        (function initController() {
            // reset login status
            //AuthenticationService.ClearCredentials();
        })();

        vm.login = function() {
            vm.dataLoading = true;
            console.log("login: enter");
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/transactions');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    });
})();
