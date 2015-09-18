'use strict';

/**
 * Removes server error when user updates input
 */

angular.module('yoprojApp')
    .directive('simpleForm', function($compile) {
        return {
            transclude: true,
            scope: {
                parentid: '=',
                datasource: "=",
                collection: "=",
                identifier: "=",
                entity: '=',
                event: '='
            },
            controller: function($http, $scope, $element, socket,Auth) {
                $scope.$on('$destroy', function() {
                    socket.unsyncUpdates($scope.entity);
                });
                // post achievement to service
                $scope.isAdmin = Auth.isAdmin;
                $scope.addDetail = function() {
                    var obj = {};
                    obj[$scope.identifier] = $scope.newThing;
                    $http.post('/api/roles/' + $scope.parentid + "/" + $scope.entity,
                        obj
                    );
                    $scope.newThing = '';
                };
                $scope.removeDetail = function(detail) {
                    debugger
                    $http.delete('/api/roles/' + $scope.parentid + '/' + $scope.entity + '/' + detail["_id"] + "/");
                };
            },
            templateUrl: "app/simpleentitydetails/simpleentitydetails.html"
        };
    });