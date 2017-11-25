angular.module('ngmkdev').factory('OrgsStore', function(Restangular) {
    return {
        orgs: [],
        queryOrgs: function(params) {
            var vm = this;
            return Restangular.all('api/orgs').post({
               params: params
            }).then(function(resp) {
              vm.orgs = resp.plain();
              //console.log(vm.orgs);
              return vm.orgs;
            });
        },
        removeOrg: function(id) {
            var vm = this;
            return Restangular.one('api/orgs', id).remove().then(function() {
              //console.log(resp.plain());
              //console.log(vm.orgs);
              //return vm.orgs;
            });
        },
        loadOrgsTree: function() {
            var vm = this;
            return Restangular.all('api/orgs').getList().then(function(resp) {
              return resp.plain();
            });
        },
    }
});
