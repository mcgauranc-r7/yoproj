'use strict';

angular.module('yoprojApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/roles').success(function(roles) {
      $scope.roles = roles;
      socket.syncUpdates('role', $scope.roles);
    });

	$scope.addAchievment = function() {
      if($scope.newAchievment === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

	
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteSkill= function(role,skill) {

      $http.delete('/api/roles/'+ role._id + '/skills/' + skill._id + "/");
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
