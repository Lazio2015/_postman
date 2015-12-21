'use strict';

var postman = angular.module('App', ['ngRoute', 'ui.router', 'ui.bootstrap', 'ngStorage'])
    .config(['$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');
        $httpProvider.interceptors.push(function ($q) {
            return {
                'response': function (response) {
                    //up to 300
                    if (response.status == 200) {
                        //console.log('OK');
                    }
                    return response;
                },
                'responseError': function (rejection) {
                    if(rejection.status === 401) {
                        location.reload();
                    }
                    return $q.reject(rejection);
                }
            };
        });

        $stateProvider
            .state('rest', {
            //    abstract: true,
                url: "/rest",
                templateUrl: 'app/rest/views/body/index.html',
                controller: 'RestCtrl'
                //views: {
                //    'content': {
                //        templateUrl: 'rest/views/body/index.html'
                //    },
                //    'history@rest': {
                //        template: '<history-rest></history-rest>',
                //        controller: 'HistoryCtrl'
                //    },
                //    'send@rest': {
                //        template: '<send-data-rest></send-data-rest>',
                //        controller: 'SendDataCtrl'
                //    }
                //    }
            })
            .state('contact', {
                url: "/contact",
                templateUrl: 'app/contact/index.html',
                controller: 'ContactCrtl'
            })
            .state('home', {
                url: "/home",
                templateUrl: 'app/home.html'
            });

        $urlRouterProvider.otherwise('/home');
    }])

    .constant('SystemConfig', {
        baseUrl: 'http://localhost:3000/server',
        historyUrl: 'http://localhost:3000/history',
        flag: true
    })

    .directive('sendDataRest',['$http', '$rootScope', 'SystemConfig', function($http, $rootScope, SystemConfig){
        return {
            restrict: 'EA',
            templateUrl: 'app/rest/views/sendData/sendData.html',
            scope: {
                data: '=',
                onResponse: '&',
                onHistoryAdd: '&'
            },
            controller: 'SendDataCtrl',
            link: function(scope, element, attrs) {

                scope.sending = function() {
                    $http.post(SystemConfig.baseUrl, scope.data).success(function(data) {
                        scope.onResponse(data.content);
                        scope.onHistoryAdd(data.history);

                    //    $rootScope.$broadcast('sendData: response', data.content);
                    //    $rootScope.$broadcast('history: add', data.history);

                    }).error(function(data) {
                        console.log(data);
                    });
                }
            }
        }
    }])

    .directive('historyRest', ['$http', '$rootScope', 'SystemConfig', function($http, $rootScope, SystemConfig) {
        return {
            templateUrl: 'app/rest/views/history/history.html',
            controller: 'HistoryCtrl',
          //  scope: {},
            link: function(scope, element, attrs,$rootScope) {

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
    }])

    .run(function($templateCache) {
        $templateCache.put('tabDefault', '<send-data-rest></send-data-rest>');
    });