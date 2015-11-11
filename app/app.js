'use strict';

var postman = angular.module('App', ['ngRoute', 'ui.router', 'ui.bootstrap'])
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

        //$stateProvider.state('rest', {
        //    abstract: true,
        //    views: {
        //        'body': {
        //            templateUrl: '/rest/views/body/index.html'
        //        },
        //        'history@rest': {
        //            template: '<history-rest></history-rest>'
        //        },
        //        'data@rest': {
        //            template: '<send-data-rest></send-data-rest>'
        //        }
        //    }
        //});


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
                data: '='
            },
            controller: 'SendDataCtrl',
            link: function(scope, element, attrs) {
                var button = jQuery(element).find('#send');

                // send data by click
                button.on('click', function() {
                    button.prop('disabled', true);

                    $http.post(SystemConfig.baseUrl, scope.data).success(function(data) {
                        $rootScope.$broadcast('sendData: response', data.content);
                        $rootScope.$broadcast('history: add', data.history);

                        button.prop('disabled', false);
                    }).error(function(data) {
                            console.log(data);
                        });
                })
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

    .directive("itemDirective", function() {
        return {
            restrict: "A",
            scope: false,
            replace: false,
            transclude: false,
            template: "id: {{ item.id }}",
            link: function($scope, $element, $attributes) {
            }
        };
    });