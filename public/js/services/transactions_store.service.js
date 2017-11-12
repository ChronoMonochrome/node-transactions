angular.module('transactionsService').factory('TransactionsStore', function(Restangular) {
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

    removeTransaction: function(transaction, tIdx) {
      var vm = this;

      vm.loadTransactions();
      vm.selected = tIdx;
      //console.log("tIdx = " + tIdx);

      return transaction.remove();
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
