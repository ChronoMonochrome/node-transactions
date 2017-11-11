angular.module('ngmkdev').factory('TransactionsStore', function(Restangular) {
  return {
    selected: 0,
    transactions: [],
    loadTransactions: function() {
      var vm = this;

      vm.transactions = Restangular.all('transactions').getList().$object;
      return vm.transactions;
    },
    addTransaction: function(transaction) {
      var vm = this;

      return Restangular.all('transactions').post({transaction: transaction}).then(function() {
        vm.transactions.push(transaction);
        vm.selected = vm.transactions.length - 1;
      })
    },
    removeTransaction: function(tIdx) {
      var vm = this;
      console.log("selected = " + tIdx);

      vm.selected = tIdx;
      vm.loadTransactions();
      return Restangular.one('transactions', tIdx).remove().then(function() {
        vm.transactions.splice(vm.selected, 1); 
      })
    },

    removeTransactionByItem: function(transaction) {
      var vm = this;

      vm.loadTransactions();
      vm.selected = transaction.id;
      console.log("selected = " + vm.selected);

      return transaction.remove().then(function() {
        var index = vm.selected;
        if (index > -1)
          vm.transactions.splice(index, 1); 
      })
    },

    removeTransactionByItem1: function(transaction) {
      var vm = this;

      vm.loadTransactions();
      vm.selected = transaction.id;
      console.log("selected = " + vm.selected);

      return Restangular.one('transactions', transaction.id).remove().then(function() {
        var index = vm.transactions.indexOf(transaction);
        if (index > -1) vm.transactions.splice(transaction, 1);
      })
    },

    getSelected: function() {
      var vm = this;

      return vm.selected;
    },
    sum: function() {
      var vm = this;

      var sum = 0;
      vm.transactions.forEach(function(el) {
        sum += parseFloat(el.amount);
      })
      return sum;
    }
  }
 });