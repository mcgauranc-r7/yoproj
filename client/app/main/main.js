'use strict';

angular.module('yoprojApp')
  .config(function ($routeProvider,$urlRouterProvider,$stateProvider) {

        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: '/app/main/main.html',
                controller: 'MainCtrl'
            })
            .state('main.profile', {
                url: '/profile',
                templateUrl: '/components/partials/roles.html',
                controller: 'MainCtrl'
            })
            .state('main.feature', {
                url: '/feature',
                templateUrl: '/components/partials/feature.html',
                controller: 'MainCtrl'
            });
        $urlRouterProvider.otherwise('/main');
    });