(function () {
    'use strict';

    angular
        .module('ngmkdev')
        .factory('UserService', UserService);

    UserService.$inject = ['Restangular'];
    function UserService(Restangular) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return Restangular.all('/api/users').getList()
                   .then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return Restangular.one('/api/users/', id).get()
                   .then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return Restangular.one('/api/users/user/', username).get()
                   .then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return Restangular.all('/api/users').post({user: user})
                   .then(handleSuccess, handleCreateError('Error creating user'));
        }

        function Update(user) {
            return Restangular.one('/api/users/', user.id).put({user: user})
                   .then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return Restangular.one('/api/users/', id).remove()
                   .then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            //console.log(res);
            return { success: true };
        }

        function handleError(error) {
            //console.log(error);
            return function (res) {
                //console.log(res);
                return { success: false, message: error };
            };
        }

        function handleCreateError(error) {
            //console.log(error);
            return function (res) {
                //console.log(res);
                if (res.status == 422)
                    error += ': username is already taken';

                return { success: false, message: error };
            };
        }
    }
})();
