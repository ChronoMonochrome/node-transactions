angular.module('ngmkdev').factory('OrgsStore', function(Restangular) {
    return {
        selected: 0,
        orgs: [],
        loadOrgs: function() {
            var vm = this;

            vm.orgs = Restangular.all('api/orgs').getList().$object;
            return vm.orgs;
        },
        addOrg: function(org) {
            var vm = this;
            vm.selected = vm.orgs.length - 1;

            return Restangular.all('api/orgs').post({
                org: org
            });
        },

        removeOrg: function(org, tIdx) {
            var vm = this;

            vm.loadOrgs();
            vm.selected = tIdx;
            return Restangular.one('api/orgs', org._id).remove();
        },

        getSelected: function() {
            var vm = this;

            return vm.selected;
        },
    }
});