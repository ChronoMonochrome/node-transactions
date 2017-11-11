angular.module('ngmkdev').controller('NavigationController', function(TransactionsStore) {
  var vm = this;

  vm.transactions = TransactionsStore.loadTransactions();
  vm.getSelected = function() {
    vm.selected = TransactionsStore.getSelected();
    return vm.selected;
  }
});