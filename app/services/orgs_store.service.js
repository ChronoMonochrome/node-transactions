angular.module('ngmkdev').factory('OrgsStore', function($localStorage, Restangular, TreeItemsLibService) {
    var service = {};

    service.storage = $localStorage.$default({
      orgs_store : {
         treeItemsState: {}
      }
    });

    service.service._storage = service.storage.orgs_store;

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
        if (service._storage.treeItemsState.selectedId != index)
            service._storage.treeItemsState.selectedId = index;
        else service._storage.treeItemsState.selectedId = -1;
    }

    service.toggleCb = function(index) {
        service._storage.treeItemsState[index] = !service._storage.treeItemsState[index];
        //console.log(service._storage.treeItemsState);
    }

    service.isListOpen = function(index) {
        //console.log(index);
        return service._storage.treeItemsState[index];
    }

    service.isSelected = function(index) {
        if (index == undefined) index = -1;
        return service._storage.treeItemsState.selectedId == index;
    }

    service.getSelected = function() {
        return service._storage.treeItemsState.selectedId;
    }

    service.loadOrgsTree = function() {
        return service._loadOrgsTree().then(function(orgs) {
            //console.log(orgs);
            service.partials["treeItemRenderer"].menuItems = orgs;
            //service.menuItems = orgs;
        });
    }

    service.removeOrg = function() {
        if (service._storage.treeItemsState.selectedId == -1)
            return;

        return service._removeOrg(service.partials["treeItemRenderer"]
            .selectedId).then(function(resp) {
            TreeItemsLibService.pruneItem(service.partials["treeItemRenderer"].menuItems,
                service._storage.treeItemsState.selectedId);
            service._storage.treeItemsState.selectedId = -1;
        });
    }

    service.showOrg = function() {
        if (service._storage.treeItemsState.selectedId == -1)
            return;
        //console.log('showOrg');
        //console.log('id: ' + service.partials["treeItemRenderer"]
        //                          .selectedId);
        return service._getOrg(service._storage.treeItemsState
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
        if (service._storage.treeItemsState.selectedId == -1)
            return;

        return service._updateOrg(service.partials["orgDialogUpdate"]
            .bodyData).then(function() {
            TreeItemsLibService.updateItemName(service.partials["treeItemRenderer"].menuItems,
                service._storage.treeItemsState.selectedId,
                service.partials["orgDialogUpdate"]
                .bodyData.name);
        });
    }

    service.createOrg = function() {
        var parentId = service._storage.treeItemsState.selectedId;
        if (parentId == -1)
            parentId = 0;

        service.partials["orgDialogCreate"]
            .bodyData.parent_id = parentId;

        return service._createOrg(service.partials["orgDialogCreate"]
            .bodyData).then(function(resp) {
            //console.log("resp: " + resp);
            TreeItemsLibService.addItem(service.partials["treeItemRenderer"].menuItems,
                service._storage.treeItemsState.selectedId,
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
            menuItems: [],
            ngActiveCheckFn: service.isSelected,
            ngClickFn: service.selectOrg,
            ngToggleFn: service.toggleCb,
            ngCheckOpenFn: service.isListOpen
        }
    };

    service.loadOrgsTree();

    return service;
});
