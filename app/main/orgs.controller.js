angular.module("ngmkdev").controller('OrgsController',
    function( /*$scope, */ OrgsStore) {
        var vm = this;
        vm.orgs  = [];

        vm.OrgsStore = OrgsStore;
        vm.queryOrgs = function(params) {
           return OrgsStore.queryOrgs(params).then(function(orgs) {
               //console.log(orgs);
               vm.menuItems = orgs;
           });
        }

        vm.testClick = function(index) {
          console.log("clicked " + index);
        }

        vm.loadOrgsTree = function() {
           return OrgsStore.loadOrgsTree().then(function(orgs) {
               //console.log(orgs);
               vm.menuItems = orgs;
           });
        }
        vm.loadOrgsTree();
    });
