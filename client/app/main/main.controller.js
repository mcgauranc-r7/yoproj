'use strict';

angular.module('yoprojApp')
    .controller('MainCtrl', function( $scope, $http, socket) {
      $scope.awesomeThings = [];
      var vars = {
        skills: {
          HeadingCaption: "Skills",
          newButtonTitle: "Add New Skill"
        },
        achievments: {
          HeadingCaption: "Achievments",
          newButtonTitle: "Add New Achievment"
        }
      };
      $scope.variables = function(val) {
        return vars[val]

      };

      $scope.stripCo = function(str) {
        return str.replace(/\s/g, '');
      }
      $scope.roles = [];
      $http.get('/api/roles').success(function(roles) {
        $scope.roles = roles;
        socket.syncUpdates('role', roles);
      });
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    });