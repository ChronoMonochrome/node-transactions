angular.module('ngmkdev').factory('FormsStore', function($localStorage, Restangular, TreeItemsLibService) {
  var service = {};

  service.storage = $localStorage.$default({
    forms_store : {
       treeItemsState: {}
    }
  });

  service._storage = service.storage.forms_store;

  service._getSurvey = function(id) {
      return Restangular.one('api/surveys', id).get().then(function(resp) {
          console.log(resp.plain());
          //console.log(service.surveys);
          //return service.surveys;
          return resp.plain();
      });
  }

  service._updateSurvey = function(params) {
      console.log(params);
      return Restangular.one('api/surveys', params.id).customPUT({
          params: params
      }).then(function(resp) {
          //console.log(resp.plain());
          //console.log(service.surveys);
          //return service.surveys;
          //return resp.plain();
      });
  }

  service._createSurvey = function(params) {
      console.log(params);
      return Restangular.all('api/surveys').post({
          params: params
      }).then(function(resp) {
          return resp.plain();
          //console.dir(resp.plain());
          //console.log(service.surveys);
          //return service.surveys;
          //return resp.plain();
      });
  }

  service._removeSurvey = function(id) {
      return Restangular.one('api/surveys', id).remove().then(function() {
          //console.log(resp.plain());
      });
  }

  service._loadSurveysTree = function() {
      return Restangular.all('api/surveys').getList().then(function(resp) {
          return resp.plain();
      });
  }

  service.querySurveys = function(params) {
      return service._querySurveys(params).then(function(surveys) {
          //console.log(surveys);
          service.partials["treeItemRenderer"].menuItems = surveys;
      });
  }

  service.selectSurvey = function(index) {
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

  service.loadSurveysTree = function() {
      return service._loadSurveysTree().then(function(surveys) {
          //console.log(surveys);
          service.partials["treeItemRenderer"].menuItems = surveys;
          //service.menuItems = surveys;
      });
  }

  service.removeSurvey = function() {
      if (service._storage.treeItemsState.selectedId == -1)
          return;

      return service._removeSurvey(service.partials["treeItemRenderer"]
          .selectedId).then(function(resp) {
          TreeItemsLibService.pruneItem(service.partials["treeItemRenderer"].menuItems,
              service._storage.treeItemsState.selectedId);
          service._storage.treeItemsState.selectedId = -1;
      });
  }

  service.showSurvey = function() {
      if (service._storage.treeItemsState.selectedId == -1)
          return;
      //console.log('showSurvey');
      //console.log('id: ' + service.partials["treeItemRenderer"]
      //                          .selectedId);
      return service._getSurvey(service._storage.treeItemsState
          .selectedId).then(function(resp) {
          //console.log('showSurvey: resp = ' + resp);
          var properties = Object.getOwnPropertyNames(
              service.partials["surveyDialogUpdate"].bodyData
          );

          properties.map(function(property) {
              service.partials["surveyDialogUpdate"]
                  .bodyData[property] = resp[property];
          });

          //console.log('surveyDialogUpdate: ' +
          //  service.partials["surveyDialogUpdate"]);
      });
  }

  service.updateSurvey = function() {
      if (service._storage.treeItemsState.selectedId == -1)
          return;

      return service._updateSurvey(service.partials["surveyDialogUpdate"]
          .bodyData).then(function() {
          TreeItemsLibService.updateItemName(service.partials["treeItemRenderer"].menuItems,
              service._storage.treeItemsState.selectedId,
              service.partials["surveyDialogUpdate"]
              .bodyData.name);
      });
  }

  service.createSurvey = function() {
      var parentId = service._storage.treeItemsState.selectedId;
      if (parentId == -1)
          parentId = 0;

      service.partials["surveyDialogCreate"]
          .bodyData.parent_id = parentId;

      return service._createSurvey(service.partials["surveyDialogCreate"]
          .bodyData).then(function(resp) {
          //console.log("resp: " + resp);
          TreeItemsLibService.addItem(service.partials["treeItemRenderer"].menuItems,
              service._storage.treeItemsState.selectedId,
              resp);
      });
  }

  service.partials = {
        "delModal": {
            id: 'delModal',
            titleText: 'Вы уверены?',
            bodyText: 'Пожалуйста, подтвердите действие.',
            dismissText: 'Отмена',
            action: service.removeSurvey,
            actionText: 'Удалить'
        },
        "surveyDialogUpdate": {
            id: 'surveyDialogUpdate',
            titleText: 'Изменить',
            bodyData: {
                id: -1,
                name: '',
                shortname: '',
                inn: '',
                parent_id: -1
            },
            dismissText: 'Отмена',
            action: service.updateSurvey,
            actionText: 'Ок',
            actionApplyText: 'Применить'
        },
        "surveyDialogCreate": {
            id: 'surveyDialogCreate',
            titleText: 'Добавить',
            bodyData: {
                name: '',
                parent_id: -1
            },
            dismissText: 'Отмена',
            action: service.createSurvey,
            actionText: 'Ок',
            actionApplyText: 'Применить'
        },
        "surveyActionPanel": {
            addTarget: "surveyDialogCreate",
            updateTarget: "surveyDialogUpdate",
            deleteTarget: "delModal",
            ngActiveCheckFn: service.isSelected,
            ngAddClickFn: null,
            ngUpdateClickFn: service.showSurvey,
            ngDeleteClickFn: null
        },
        "treeItemRenderer": {
            selectedId: -1,
            menuItems: [],
            ngActiveCheckFn: service.isSelected,
            ngClickFn: service.selectSurvey,
        }
  };

  service.loadSurveysTree();

  return service;
});
