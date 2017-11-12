angular.module("ngmkdev").controller('TransactionsController',
                          function(/*$scope, */ TransactionsStore) {
  var vm = this;

  vm.addTransaction = function() {
    TransactionsStore.addTransaction(vm.newTransaction).then(function(transaction) {
       vm.transactions.push(transaction);
    });
    vm.resetTransaction();
  }

  vm.setSelected = function(selected) {
    vm.selected = selected;
  }

  vm.removeTransaction = function(selected, tIdx) {
    TransactionsStore.removeTransaction(selected, tIdx).then(function() {
      vm.transactions.splice(tIdx, 1);
    });
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

