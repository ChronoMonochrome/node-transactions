angular.module("ngmkdev").controller('OrgsController',
    function( /*$scope, */ OrgsStore) {
        var vm = this;
        vm.OrgsStore = OrgsStore;
    });