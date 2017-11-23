
(function() {
    'use strict';

    angular
        .module('ngmkdev')
        .controller('LoginController',
            function LoginController($window, AuthenticationService, FlashService) {
                var vm = this;

                vm.AuthenticationService = AuthenticationService;

                vm.login = function() {
                    vm.dataLoading = true;
                    console.log("login: enter");
                    AuthenticationService.Login(vm.username, vm.password, function(response) {
                        if (response.success) {
                            AuthenticationService.SetCredentials(vm.username, vm.password);
                            $window.location.href = '/';
                        } else {
                            FlashService.Error(response.message);
                            vm.dataLoading = false;
                        }
                    });
                };
            });
})();