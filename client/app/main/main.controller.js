'use strict';

angular.module('yoprojApp')
    .controller('MainCtrl', function($scope, $http, socket, Auth, $state, records) {
        $scope.roles = records;
        socket.syncUpdates('role', $scope.roles);
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

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('thing');
        });


    });