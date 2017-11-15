(function () {
    'use strict';

    angular
    .module('ngmkdev')
    .controller('LoginController',
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = function() {
            vm.dataLoading = true;
            console.log("login: enter");
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    });
})();
