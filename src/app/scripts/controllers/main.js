'use strict';

/**
 * @ngdoc function
 * @name inotesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inotesApp
 */
angular.module('inotesApp')
  .controller('MainCtrl', function (user, $scope) {

    $scope.register = function(){
      var promise = user.registerUser($scope.nameReg,$scope.surameReg,$scope.mailReg,$scope.passReg);

      console.log(promise);



    };



  });
