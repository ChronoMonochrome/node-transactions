angular.module("ngmkdev").controller('OrgsController',
    function( /*$scope, */ OrgsStore) {
        var vm = this;

        vm.addOrg = function() {
            OrgsStore.addOrg(vm.newOrg).then(function(org) {
                vm.orgs.push(Org);
            });
            vm.resetOrg();
        }

        vm.setSelected = function(selected) {
            vm.selected = selected;
        }

        vm.removeOrg = function(selected, tIdx) {
            OrgsStore.removeOrg(selected, tIdx).then(function() {
                vm.Orgs.splice(tIdx, 1);
            });
        }

        vm.resetOrg = function() {
            vm.newOrg = {
                name: "fullName",
                shortName: "shortName",
                description: null
            }
        }

        vm.orgs = OrgsStore.loadOrgs();
        vm.resetOrg();
    });
