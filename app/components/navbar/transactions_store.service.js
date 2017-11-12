angular.module('ngmkdev').factory('TransactionsStore', function(Restangular) {
  return {
    selected: 0,
    transactions: [],
    loadTransactions: function() {
      var vm = this;

      vm.transactions = Restangular.all('api/transactions').getList().$object;
      return vm.transactions;
    },
    addTransaction: function(transaction) {
      var vm = this;
      vm.selected = vm.transactions.length - 1;

      return Restangular.all('api/transactions').post({transaction: transaction});
    },

    removeTransaction: function(transaction, tIdx) {
      var vm = this;

      vm.loadTransactions();
      vm.selected = tIdx;
      return Restangular.one('api/transactions', transaction._id).remove();
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
