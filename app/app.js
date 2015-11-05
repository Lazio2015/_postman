'use strict';

var postman = angular.module('App', ['ngRoute', 'ngResource']).config(function($routeProvider){
        $routeProvider.when('/contact', {
            templateUrl: 'app/contact/index.html',
            controller: 'ContactCrtl'
        }); //'App.history' - CONNECT ng-app
        $routeProvider.when('/rest', {
            templateUrl: 'app/rest/index.html',
            controller: 'RestCtrl'
        });
        $routeProvider.otherwise({redirectTo: '/'});
    })

    .constant('SystemConfig', {
        baseUrl: 'http://localhost:3000/server',
        historyUrl: 'http://localhost:3000/history',
        flag: true
    })

    .directive('delete',['HistoryService', function(HistoryService){
        return function($scope, element, attrs){
            element.on('click', function(){
                HistoryService.delete(attrs.id);
            });
        };
    }])

    .directive('textInput',['$http', '$rootScope', 'SystemConfig', function($http, $rootScope, SystemConfig){
        return {
            restrict: 'EA',
            templateUrl: "app/rest/block.html",
            scope: {

            },
            controller: function ($scope, $rootScope) {
                $scope.$on('query:response', function (e, res, history) {
                    $scope.response = res;
                    history.id = res.id;
                    $rootScope.$broadcast('history:add', history);
                })
            },
            link: function(scope, element, attrs) {
                var button = jQuery(element).find('#send');

                button.on('click', function() {
                    var query = {url: '', type: 'GET'};
                    query.url = jQuery(element).find('#url').val();
                    query.type = jQuery(element).find('#type').val();

                    $http.post(SystemConfig.baseUrl, query).success(function(res) {
                        $rootScope.$broadcast('query:response', res, query);
                    });

                })
            }
        }
    }])

    .factory('HistoryService',['SystemConfig', '$http', '$rootScope', function(SystemConfig, $http, $rootScope){
        return {
            getlist: function(){
                return $http.get(SystemConfig.historyUrl);
            },

            delete: function(id){
                $http.delete(SystemConfig.historyUrl+'/'+id).success(function(data, status) {
                    $rootScope.$broadcast('history-delete', data);
                });
            },

            add: function() {
                $http.post(SystemConfig.historyUrl).success(function(data, status) {
                })
            }
        }
    }]);