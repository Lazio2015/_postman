'use strict';

var postman = angular.module('App', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function($routeProvider){
        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
        $routeProvider.when('/contact', {
            templateUrl: 'app/contact/index.html',
            controller: 'ContactCrtl'
        });
        $routeProvider.when('/rest', {
            templateUrl: 'app/rest/index.html',
            controller: 'RestCtrl'
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    .constant('SystemConfig', {
        baseUrl: 'http://localhost:3000/server',
        historyUrl: 'http://localhost:3000/history',
        flag: true
    })

    .directive('sendDataRest',['$http', '$rootScope', 'SystemConfig', function($http, $rootScope, SystemConfig){
        return {
            restrict: 'EA',
            templateUrl: 'app/rest/sendData/sendData.html',
            scope: {

            },
            controller: function($scope) {
                $scope.title = 'Rest: SendData page';
                $scope.data = {
                    type: 'GET',
                    url: ''
                };

                $scope.$on('sendData: invoke', function(e, query) {
                    $scope.data = query;
                });
            },
            link: function(scope, element, attrs) {
                var button = jQuery(element).find('#send');

                // send data by click
                button.on('click', function() {
                    button.prop('disabled', true);

                    $http.post(SystemConfig.baseUrl, scope.data).success(function(data) {
                        $rootScope.$broadcast('sendData: response', data.content);
                        $rootScope.$broadcast('history: add', data.history);

                        button.prop('disabled', false);
                    });
                })
            }
        }
    }])

    .directive('historyRest', ['$http', '$rootScope', 'SystemConfig', function($http, $rootScope, SystemConfig) {
        return {
            templateUrl: 'app/rest/history/history.html',
            controller: 'HistoryCtrl',
            link: function(scope, element, attrs) {

                $http.get(SystemConfig.historyUrl).success(function(data) {
                    scope.history = data;
                });

                scope.delete = function(id) {
                    $http.delete(SystemConfig.historyUrl+'/'+id).success(function(data, status) {
                        scope.$broadcast('history: delete', data);
                    });
                };

                scope.invokeClick = function(data) {
                    scope.$broadcast('sendData: invoke', data);
                }
        }
    }
    }]);