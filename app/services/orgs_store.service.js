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
        loadOrgsTree: function() {
            var vm = this;
            return Restangular.all('api/orgs').getList().then(function(resp) {
              return resp.plain();
            });
        },
    }
});
