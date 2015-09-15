'use strict';

angular.module('yoprojApp')
    .controller('MainCtrl', function( $scope, $http, socket,Auth) {
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

      var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
          prop,
          el = document.createElement('div');

      for(var i = 0, l = props.length; i < l; i++) {
        if(typeof el.style[props[i]] !== "undefined") {
          prop = props[i];
          break;
        }
      }
      $scope.renderFn = function(){
        var xAngle = 0, yAngle = 0;
        $('body').keydown(function(evt) {
          switch(evt.keyCode) {
            case 37: // left
              yAngle -= 90;
              break;

            case 38: // up
              xAngle += 90;
              evt.preventDefault();
              break;

            case 39: // right
              yAngle += 90;
              break;

            case 40: // down
              xAngle -= 90;
              evt.preventDefault();
              break;
          };
          document.getElementById('cube').style[prop] = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
        });
      }

  });
