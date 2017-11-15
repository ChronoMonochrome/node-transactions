(function () {
    'use strict';

    angular
        .module('ngmkdev')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.btnDisabled = false;
        vm.register = register;
        vm.checkUsername = checkUsername;

        function checkUsername() {
            var res = UserService.GetByUsername(vm.user.username);
            if (res == undefined)
                return;

            res.then(
                function(response) {
                    vm.btnDisabled = (response.username != undefined);
                    if (vm.btnDisabled)
                         FlashService.Error('Username is already taken', true);
                    else
                         FlashService.Hide();
                }
            );
        }

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
