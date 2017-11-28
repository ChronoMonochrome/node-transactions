angular.module('ngmkdev').factory('FormsStore', function(Restangular) {
    var vm = this;
    var service = {};
    service._getOrg = function(id) {
        return Restangular.one('api/orgs', id).get().then(function(resp) {
            console.log(resp.plain());
            //console.log(service.orgs);
            //return service.orgs;
            return resp.plain();
        });
    }

    service._updateOrg = function(params) {
        console.log(params);
        return Restangular.one('api/orgs', params.id).customPUT({
            params: params
        }).then(function(resp) {
            //console.log(resp.plain());
            //console.log(service.orgs);
            //return service.orgs;
            //return resp.plain();
        });
    }

    service._createOrg = function(params) {
        console.log(params);
        return Restangular.all('api/orgs').post({
            params: params
        }).then(function(resp) {
            return resp.plain();
            //console.dir(resp.plain());
            //console.log(service.orgs);
            //return service.orgs;
            //return resp.plain();
        });
    }

    service._removeOrg = function(id) {
        return Restangular.one('api/orgs', id).remove().then(function() {
            //console.log(resp.plain());
        });
    }

    service._loadOrgsTree = function() {
            return Restangular.all('api/orgs').getList().then(function(resp) {
                return resp.plain();
            });
    }

    service.queryOrgs = function(params) {
            return service._queryOrgs(params).then(function(orgs) {
                //console.log(orgs);
                service.partials["treeItemRenderer"].menuItems = orgs;
            });
    }

    service.selectOrg = function(index) {
        //console.log("clicked " + index);
        if (service.partials["treeItemRenderer"].selectedId != index)
            service.partials["treeItemRenderer"].selectedId = index;
        else service.partials["treeItemRenderer"].selectedId = -1;
    }

    service.isSelected = function(index) {
        if (index == undefined) index = -1;
        return service.partials["treeItemRenderer"].selectedId == index;
    }

    service.getSelected = function() {
        return service.partials["treeItemRenderer"].selectedId;
    }

    service.loadOrgsTree = function() {
        return service._loadOrgsTree().then(function(orgs) {
            //console.log(orgs);
            service.partials["treeItemRenderer"].menuItems = orgs;
            //service.menuItems = orgs;
        });
    }

    service._pruneOrg = function(tree, id) {
        for (var i = 0; i < tree.length; ++i) {
            var obj = tree[i];
            if (obj.id === id) {
                // splice out 1 element starting at position i
                tree.splice(i, 1);
                return true;
            }
            if (obj.children) {
                if (service._pruneOrg(obj.children, id)) {
                    if (obj.children.length === 0) {
                        // delete children property when empty
                        delete obj.children;
                    }
                    return true;
                }
            }
        }
    }

    service._updateOrgName = function(tree, id, name) {
        for (var i = 0; i < tree.length; ++i) {
            var obj = tree[i];
            if (obj.id === id) {
                //console.log("found: " + obj);
                tree[i].text = name;
                return true;
            }
            if (obj.children) {
                if (service._updateOrgName(obj.children, id, name)) {
                    return true;
                }
            }
        }
    }

    service._addOrg = function(tree, parent_id, element) {
        if (parent_id == 0 || parent_id == -1) {
            tree.push(element);
            return true;
        }

        for (var i = 0; i < tree.length; ++i) {
            var obj = tree[i];
            if (obj.id === parent_id) {
                //console.log("found: " + obj);
                //console.dir(tree);
                if (obj.children == undefined)
                    tree[i].children = [];

                tree[i].children.push(element);
                return true;
            }
            if (obj.children) {
                if (service._addOrg(obj.children, parent_id, element)) {
                    return true;
                }
            }
        }
    }

    service.removeOrg = function() {
        if (service.partials["treeItemRenderer"].selectedId == -1)
            return;

        return service._removeOrg(service.partials["treeItemRenderer"]
            .selectedId).then(function(resp) {
            service._pruneOrg(service.partials["treeItemRenderer"].menuItems,
                service.partials["treeItemRenderer"].selectedId);
            service.partials["treeItemRenderer"].selectedId = -1;
        });
    }

    service.showOrg = function() {
        if (service.partials["treeItemRenderer"].selectedId == -1)
            return;
        //console.log('showOrg');
        //console.log('id: ' + service.partials["treeItemRenderer"]
        //                          .selectedId);
        return service._getOrg(service.partials["treeItemRenderer"]
            .selectedId).then(function(resp) {
            //console.log('showOrg: resp = ' + resp);
            var properties = Object.getOwnPropertyNames(
                service.partials["orgDialogUpdate"].bodyData
            );

            properties.map(function(property) {
                service.partials["orgDialogUpdate"]
                    .bodyData[property] = resp[property];
            });

            //console.log('orgDialogUpdate: ' +
            //  service.partials["orgDialogUpdate"]);
        });
    }

    service.updateOrg = function() {
        if (service.partials["treeItemRenderer"].selectedId == -1)
            return;

        return service._updateOrg(service.partials["orgDialogUpdate"]
            .bodyData).then(function() {
            service._updateOrgName(service.partials["treeItemRenderer"].menuItems,
                service.partials["treeItemRenderer"].selectedId,
                service.partials["orgDialogUpdate"]
                .bodyData.name);
        });
    }

    service.createOrg = function() {
            var parentId = service.partials["treeItemRenderer"].selectedId;
            if (parentId == -1)
                parentId = 0;

            service.partials["orgDialogCreate"]
                .bodyData.parent_id = parentId;

            return service._createOrg(service.partials["orgDialogCreate"]
                .bodyData).then(function(resp) {
                //console.log("resp: " + resp);
                service._addOrg(service.partials["treeItemRenderer"].menuItems,
                    service.partials["treeItemRenderer"].selectedId,
                    resp);
            });
    }

    service.log = function(obj) {
        console.dir(obj);
    }

    service.partials = {
        "delModal": {
            id: 'delModal',
            titleText: 'Вы уверены?',
            bodyText: 'Пожалуйста, подтвердите действие.',
            dismissText: 'Отмена',
            action: service.removeOrg,
            actionText: 'Удалить'
        },
        "orgDialogUpdate": {
            id: 'orgDialogUpdate',
            titleText: 'Изменить',
            bodyData: {
                id: -1,
                name: '',
                shortname: '',
                inn: '',
                parent_id: -1
            },
            dismissText: 'Отмена',
            action: service.updateOrg,
            actionText: 'Ок',
            actionApplyText: 'Применить'
        },
        "orgDialogCreate": {
            id: 'orgDialogCreate',
            titleText: 'Добавить',
            bodyData: {
                name: '',
                shortname: '',
                inn: '',
                parent_id: -1
            },
            dismissText: 'Отмена',
            action: service.createOrg,
            actionText: 'Ок',
            actionApplyText: 'Применить'
        },
        "orgActionPanel": {
            addTarget: "orgDialogCreate",
            updateTarget: "orgDialogUpdate",
            deleteTarget: "delModal",
            ngActiveCheckFn: service.isSelected,
            ngAddClickFn: null,
            ngUpdateClickFn: service.showOrg,
            ngDeleteClickFn: null
        },
        "treeItemRenderer": {
            selectedId: -1,
            menuItems: [],
            ngActiveCheckFn: service.isSelected,
            ngClickFn: service.selectOrg,
        }
    };

    //service.loadOrgsTree();

    return service;
});
