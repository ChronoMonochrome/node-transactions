angular.module("ngmkdev").controller('OrgsController',
    function( /*$scope, */ OrgsStore) {
        var vm = this;

        vm.orgs  = [];
        vm.active = -1;

        vm.OrgsStore = OrgsStore;
        vm.queryOrgs = function(params) {
           return OrgsStore.queryOrgs(params).then(function(orgs) {
               //console.log(orgs);
               vm.menuItems = orgs;
           });
        }

        vm.selectOrg = function(index) {
          //console.log("clicked " + index);
          if (vm.active != index)
            vm.active = index;
          else vm.active = -1;
        }

        vm.loadOrgsTree = function() {
           return OrgsStore.loadOrgsTree().then(function(orgs) {
               //console.log(orgs);
               vm.menuItems = orgs;
           });
        }

        _pruneOrg = function (tree, id) {
           for (var i = 0; i < tree.length; ++i) {
             var obj = tree[i];
             if (obj.id === id) {
               // splice out 1 element starting at position i
               tree.splice(i, 1);
               return true;
             }
             if (obj.children) {
               if (_pruneOrg(obj.children, id)) {
                 if (obj.children.length === 0) {
                      // delete children property when empty
                      delete obj.children;

                      // or, to delete this parent altogether
                      // as a result of it having no more children
                      // do this instead
                      tree.splice(i, 1);
                  }
                  return true;
              }
            }
          }
        }

        vm.removeOrg = function() {
           if (vm.active == -1)
               return;

           return OrgsStore.removeOrg(vm.active).then(function(resp) {
               //console.log(resp);
               //vm.menuItems = orgs;
               //vm.loadOrgsTree();
               _pruneOrg(vm.menuItems, vm.active);
               vm.active = -1;
           });
        }
        vm.loadOrgsTree();
    });
