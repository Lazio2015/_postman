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


    .directive('sendDataRest',['$http', '$rootScope', 'SystemConfig', function($http, $rootScope, SystemConfig){
        return {
            restrict: 'EA',
            templateUrl: 'app/rest/sendData/sendData.html',
            scope: {

            },
            controller: function($scope) {
                $scope.title = 'Rest: SendData page';

                //$rootScope.$on('main:response', function (e, res, history) {
                //    $scope.response = res;
                //    history.id = res.id;
                //    $scope.$broadcast('history:add', history);
                //});

                $scope.$on('addUrl', function(e, query) {
                    console.log('2');
                    query.url = jQuery(element).find('#url').val(query.url);
                    query.type = jQuery(element).find('#type').val(query.type);
                });
            },
        //    controller: 'SendDataCtrl',
            link: function(scope, element, attrs) {
                var button = jQuery(element).find('#send');

                button.on('click', function() {
                    var query = {url: '', type: 'GET'};
                    query.url = jQuery(element).find('#url').val();
                    query.type = jQuery(element).find('#type').val();

                    $http.post(SystemConfig.baseUrl, query).success(function(data) {
                        scope.$broadcast('send:response', data);
                        scope.$broadcast('history:add', history);
                    });

                })
            }
        }
    }])

    .directive('historyRest', ['$http', '$rootScope', function($http, $rootScope) {
        return {
            templateUrl: 'app/rest/history/history.html',
            controller: 'HistoryCtrl',
            link: function(scope, element, attrs) {
                    //    click: function(scope, element, attrs){
                    element.on('click', function () {
                        var query = {};
                        query.type = jQuery(element).find('.type');
                        query.url = jQuery(element).find('.url');

                        scope.$broadcast('addUrl', {url:'s', type:'df'});

                    });
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