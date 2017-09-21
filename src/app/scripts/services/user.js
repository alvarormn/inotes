'use strict';

/**
 * @ngdoc service
 * @name inotesApp.user
 * @description
 * # user
 * Service in the inotesApp.
 */
angular.module('inotesApp')
  .service('user', function ($http,$q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    function registerUser(name,surname,mail,pass) {
      var defered=$q.defer();
      var promise=defered.promise;

      $http({
        method: 'POST',
        url: 'http://localhost:3977/api/register',
        data: {
          name: name,
          surname: surname,
          email: mail,
          password: pass,
          role: 'USER_ROLE'
        }
      }).then(function successCallback(response) {
        var data = response.data;
        var menssage = 'alert alert-success';
        defered.resolve(data,menssage);
      }, function errorCallback(response) {
        console.log(response.data);
        var data = response.data;
        var menssage = 'alert alert-danger';
        defered.reject(data,menssage);
      });

      return promise;
    }

  });
