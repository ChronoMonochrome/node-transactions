angular.module('ngmkdev').controller('NavigationController', function($window, TransactionsStore, AuthenticationService) {
    var vm = this;

    vm.transactions = TransactionsStore.loadTransactions();

    vm.logout = function() {
             // reset login status
             AuthenticationService.ClearCredentials();
             $window.location.href = '/';
    }

    vm.getSelected = function() {
        vm.selected = TransactionsStore.getSelected();
        return vm.selected;
    }
});
