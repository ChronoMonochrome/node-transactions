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
        getOrg: function(id) {
            var vm = this;
            return Restangular.one('api/orgs', id).get().then(function(resp) {
              console.log(resp.plain());
              //console.log(vm.orgs);
              //return vm.orgs;
              return resp.plain();
            });
        },
        updateOrg: function(params) {
            var vm = this;
            console.log(params);
            return Restangular.one('api/orgs', params.id).customPUT(
              { params : params }).then(function(resp) {
              //console.log(resp.plain());
              //console.log(vm.orgs);
              //return vm.orgs;
              //return resp.plain();
            });
        },
        removeOrg: function(id) {
            var vm = this;
            return Restangular.one('api/orgs', id).remove().then(function() {
              //console.log(resp.plain());
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
