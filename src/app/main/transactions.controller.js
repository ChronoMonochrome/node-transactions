//src/app/main/transactions.controller.js
angular.module("ngmkdev").controller('TransactionsController',
                          function(/*$scope, */ TransactionsStore) {
  var vm = this;

  vm.addTransaction = function() {
    TransactionsStore.addTransaction(vm.newTransaction);
    vm.resetTransaction();
  }

  vm.setSelected = function(selected) {
    vm.selected = selected;
  }

  vm.removeTransaction = function(selected) {
    vm.setSelected(selected);
    TransactionsStore.removeTransaction(selected);
  }

  vm.removeTransactionByItem = function(selected) {
    TransactionsStore.removeTransactionByItem(selected);
  }

  vm.removeTransactionByItem1 = function(selected) {
    TransactionsStore.removeTransactionByItem1(selected);
  }

  vm.resetTransaction = function() {
    vm.newTransaction = {
      amount: 0.0,
      date: "1993-02-01",
      description: null
    }
  }

  vm.transactions = TransactionsStore.loadTransactions();
  vm.resetTransaction();
});

