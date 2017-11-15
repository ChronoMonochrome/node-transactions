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
            var res = Restangular.all('/api/users').getList();
            res.then(handleSuccess, handleError('Error getting all users'));

            return res.$object;
        }

        function GetById(id) {
            var res;

            if (!parseInt(id))
                return undefined;

            res = Restangular.one('/api/users/', id).get();
            res.then(handleSuccess, handleError('Error getting user by id'));

            return res.$object;
        }

        function GetByUsername(username) {
            var res;

            if (!username)
                return undefined;

            res = Restangular.one('/api/users/user/', username).get();
            res.then(handleSuccess, handleError('Error getting user by username'));

            return res.$object;
        }

        function Create(user) {
            var res = Restangular.all('/api/users').post({user: user});
            res.then(handleSuccess, handleCreateError('Error creating user'));

            return res.$object;
        }

        function Update(user) {
            var res = Restangular.one('/api/users/', user.id).put({user: user});
            res.then(handleSuccess, handleError('Error updating user'));

            return res.$object;
        }

        function Delete(id) {
            var res = Restangular.one('/api/users/', id).remove();
            res.then(handleSuccess, handleError('Error deleting user'));

            return res.$object;
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
