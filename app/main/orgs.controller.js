angular.module("ngmkdev").controller('OrgsController',
    function( /*$scope, */ OrgsStore) {
        var vm = this;
        vm.OrgsStore = OrgsStore;

        vm.queryOrgs = function(params) {
           return OrgsStore.queryOrgs(params).then(function(orgs) {
               //console.log(orgs);
               vm.partials["treeItemRenderer"].menuItems = orgs;
           });
        }

        vm.selectOrg = function(index) {
          //console.log("clicked " + index);
          if (vm.partials["treeItemRenderer"].selectedId != index)
            vm.partials["treeItemRenderer"].selectedId = index;
          else vm.partials["treeItemRenderer"].selectedId = -1;
        }

        vm.isSelected = function(index) {
          return vm.partials["treeItemRenderer"].selectedId == index;
        }

        vm.getSelected = function() {
          return vm.partials["treeItemRenderer"].selectedId;
        }

        vm.loadOrgsTree = function() {
           return OrgsStore.loadOrgsTree().then(function(orgs) {
               //console.log(orgs);
               vm.partials["treeItemRenderer"].menuItems = orgs;
               //vm.menuItems = orgs;
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

        _updateOrgName = function (tree, id, name) {
           for (var i = 0; i < tree.length; ++i) {
             var obj = tree[i];
             if (obj.id === id) {
               //console.log("found: " + obj);
               tree[i].text = name;
               return true;
             }
             if (obj.children) {
               if (_updateOrgName(obj.children, id, name)) {
                  return true;
              }
            }
          }
        }

        vm.removeOrg = function() {
           if (vm.partials["treeItemRenderer"].selectedId == -1)
               return;

           return OrgsStore.removeOrg(vm.partials["treeItemRenderer"]
                                     .selectedId).then(function(resp) {
               _pruneOrg(vm.partials["treeItemRenderer"].menuItems,
                         vm.partials["treeItemRenderer"].selectedId);
               vm.partials["treeItemRenderer"].selectedId = -1;
           });
        }

        vm.showOrg = function() {
          if (vm.partials["treeItemRenderer"].selectedId == -1)
              return;
          //console.log('showOrg');
          //console.log('id: ' + vm.partials["treeItemRenderer"]
          //                          .selectedId);
          return OrgsStore.getOrg(vm.partials["treeItemRenderer"]
                                    .selectedId).then(function(resp) {
              //console.log('showOrg: resp = ' + resp);
              var properties = Object.getOwnPropertyNames(
                vm.partials["orgDialogModal"].bodyData
              );

              properties.map(function(property) {
                vm.partials["orgDialogModal"]
                  .bodyData[property] = resp[property];
              });

              //console.log('orgDialogModal: ' +
              //  vm.partials["orgDialogModal"]);
          });
        }

        vm.updateOrg = function() {
          if (vm.partials["treeItemRenderer"].selectedId == -1)
              return;

          return OrgsStore.updateOrg(vm.partials["orgDialogModal"]
            .bodyData).then(function() {
              _updateOrgName(vm.partials["treeItemRenderer"].menuItems,
                        vm.partials["treeItemRenderer"].selectedId,
                        vm.partials["orgDialogModal"]
                          .bodyData.name);
            });
        }

        vm.log = function(obj) {
          console.dir(obj);
        }

        vm.partials = {
          "delModal" : {
              id         : 'delModal',
              titleText  : 'Вы уверены?',
              bodyText   : 'Пожалуйста, подтвердите действие.',
              dismissText: 'Отмена',
              action     :  vm.removeOrg,
              actionText : 'Удалить'
          },
          "orgDialogModal" : {
              id         : 'orgDialogModal',
              titleText  : 'Изменить',
              bodyData   : {
                id       : -1,
                name     : '',
                shortname: '',
                inn      : '',
                parent_id: -1
              },
              dismissText: 'Отмена',
              action     : vm.updateOrg,
              actionText : 'Обновить',
              actionApplyText : 'Применить'
          },
          "treeItemRenderer" : {
              selectedId      : -1,
              menuItems       : [],
              ngActiveCheckFn : vm.isSelected,
              ngClickFn       : vm.selectOrg,
          }
        };

        vm.loadOrgsTree();
        //vm.partials["treeItemRenderer"]["menuItems"] = vm.menuItems;
        //console.log(vm.menuItems);
    });
