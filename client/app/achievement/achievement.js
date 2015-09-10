'use strict';

/**
 * Removes server error when user updates input
 */

angular.module('yoprojApp')
  .directive('myAchmievments', function($compile) {
      return {
       transclude:true,
       scope: {
           datasource : "=",
           event: '='
      },

      controller: function(  $http, $scope, $element ) {

        $scope.obj="asd"

        // load comments if event ID has changed
        $scope.$watch( 'event', function() {
          if( typeof $scope.event != 'undefined' ) {
            debugger
          }
        });

        // post achievement to service
        $scope.addAchievment = function() {
            $http.post('/api/roles/'+$scope.$parent.role._id+"/achievment", { details: $scope.newThing });
            $scope.newThing = '';
        };
      },
      templateUrl:"app/achievement/achievmentForm.html"
    };
  });
