'use strict';

angular.module('yoprojApp')
    .controller('MainCtrl', function( $scope, $http, socket,Auth,$state) {
       $scope.view = "listview";
      $scope.changeView = function(){
        $scope.view = $scope.view === "listview"?"timeline":"listview";
      }
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
      $scope.isLoggedIn = Auth.isLoggedIn;

      $scope.show = false;

      $scope.stripCo = function(str) {
        return str.replace(/\s/g, '');
      }
      $scope.roles = [];
    $scope.ga= {
      latitude: 37.78,
      longitude: -122.41
    }
      $http.get('/api/roles').success(function(roles) {
        $scope.roles = roles;
        socket.syncUpdates('role', roles);
      });
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });


  });
