'use strict';

/**
 * Removes server error when user updates input
 */

angular.module('yoprojApp')
    .directive('mapWrap', function() {
        return {
            scope : {
              role : "="
            },
            templateUrl: 'components/map/map.html',
            link: function($scope, element, attrs) {
              var stripCo = function(str) {
                return str.replace(/\s/g, '');
              }
            var cordinates = stripCo($scope.role.coordinates).split(",");
            $scope.map = {
                center: {
                    latitude: cordinates[0],
                    longitude: cordinates[1]
                },
                zoom: 14,
                options: {
                    labelClass:'marker_labels',labelAnchor:'12 60',labelContent:''
                }
            };

              $scope.options = {
                scrollwheel: false
              };
            }
        }
    });
