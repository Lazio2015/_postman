'use strict';

angular.module('App.history', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/history', {
            templateUrl: 'app/rest/history/history.html',
            controller: 'HistoryCtrl'
        });
    }])

    .factory('HistoryService',['$http', function($http){
        return {
            //getlist: function(cb){
            //    $http.get('http://localhost:3000/history').success(function(data, status) {
            //        //var res = data;
            //        cb(data);
            //    }).error(function(data){
            //        //
            //        cb([]);
            //    });
            //},
            getlist: function(){
                $http.get('http://localhost:3000/history').success(function(data, status) {
                    //var res = data;
                    return data;
                }).error(function(data){
                    //
                   /// cb([]);
                });
            },

            delete: function(id, cb){
                $http.delete('http://localhost:3000/history/'+id).success(function(data, status) {
                    //var res = data;
                    cb(data);
                }).error(function(data){
                    //
                    cb([]);
                });
            },

            add: function() {
                $http.post('http://localhost:3000/history').success(function(data, status) {

                })
            }
        }
    }])

    .controller('HistoryCtrl', ['$scope', 'HistoryService', function($scope, HistoryService) {
        $scope.title = 'History page';
        HistoryService.getlist(function(cb) {
            $scope.history = cb;
        });
    }])

    ;