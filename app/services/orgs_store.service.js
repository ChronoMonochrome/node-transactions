angular.module('ngmkdev').factory('OrgsStore', function(Restangular) {
    // private functions

    function handleSuccess(res) {
        //console.log(res);
        return {
            success: true
        };
    }

    function handleError(error) {
        //console.log(error);
        return function(res) {
            //console.log(res);
            return {
                success: false,
                message: error
            };
        };
    }

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
        loadOrgs: function() {
            var vm = this;

            vm.orgs = Restangular.all('api/orgs').getList().then(
              handleSuccess, handleError
            );
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
