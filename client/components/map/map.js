'use strict';

/**
 * Removes server error when user updates input
 */

angular.module('yoprojApp')
    .directive('map', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            template: '<div></div>',
            link: function($scope, element, attrs) {
                var stripCo = function(str) {
                    return str.replace(/\s/g, '');
                }
                var center = new google.maps.LatLng(stripCo($scope.role.coordinates));

                var map_options = {
                    zoom: 6,
                    center: center,
                    mapTypeId: google.maps.MapTypeId.SATELLITE
                };
                // create map
                var map = new google.maps.Map(document.getElementById(attrs.id), map_options);
                // configure marker
                var marker_options = {
                    map: map,
                    position: center
                };

                // create marker
                var marker = new google.maps.Marker(marker_options);

                $scope.$watch('selected', function () {
                    debugger
                    window.setTimeout(function(){

                        google.maps.event.trigger(map, 'resize');
                    },100);

                });
            }
        }
    });