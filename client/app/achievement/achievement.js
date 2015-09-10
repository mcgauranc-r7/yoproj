'use strict';

/**
 * Removes server error when user updates input
 */

angular.module('yoprojApp')
  .directive('myAchmievments', function($compile) {
      return {
       transclude:true,
       scope: {
         parentid: '=',
         datasource : "=",
         collection : "=",
         identifier : "=",
         entity : '=',
         event: '='
      },

      controller: function(  $http, $scope, $element, socket ) {
        $scope.$on('$destroy', function () {
          socket.unsyncUpdates($scope.entity);
        });


        // post achievement to service
        $scope.addDetail = function() {
          var obj = {};
          obj[$scope.identifier] = $scope.newThing;
          $http.post('/api/roles/'+$scope.parentid+"/" +$scope.entity,
             obj
            );
            $scope.newThing = '';
            socket.syncUpdates($scope.entity);

        };
        $scope.removeDetail = function(detail) {
          $http.delete('/api/roles/'+ $scope.parentid + '/' + $scope.entity + '/' + detail["_id"] + "/");
          socket.syncUpdates($scope.entity);
        };
      },
      templateUrl:"app/achievement/achievmentForm.html"
    };
  });
