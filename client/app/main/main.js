'use strict';

angular.module('yoprojApp')
  .config(function ($routeProvider,$urlRouterProvider,$stateProvider) {
        $stateProvider.
            state("main", {
                abstract: true,
                url: "/main",
                templateUrl: "/app/main/main.html",
                controller: 'MainCtrl',
                resolve: {
                    records: function($stateParams, $http) {
                        return $http.get('/api/roles').then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .state('main.profile', {
                url: '/profile',
                templateUrl: '/components/partials/roles.html',
                controller: 'MainCtrl'
            })
            .state('main.feature', {
                url: '/feature',
                templateUrl: '/components/partials/feature.html',
                controller: 'MainCtrl',
                resolve: {
                    records: function($stateParams, $http) {
                        return $http.get('/api/roles').then(function (response) {
                            return response.data;
                        });

                    }
                }
            });
            $urlRouterProvider.otherwise('/main/profile');
    });