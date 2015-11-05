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

    .directive('delete', function(){
        return function($scope, element, attrs){
            element.on('click', function(){
                $scope.delete(attrs.id);
            });
        };
    })

    .directive('textInput',['$http', '$rootScope', function($http, $rootScope){
        return {
            restrict: 'EA',
            templateUrl: "app/rest/block.html",
            scope: {},
            controller: function() {

            },
            link: function(scope, element, attrs) {
                console.log(element);
                console.log(element[0].attr);
                element.on('click', function() {
                    $http({
                        method: 'GET',
                        url: 'http://localhost/server/getlist'
                    }).success(function(data) {
                        $rootScope.$broadcast('abc', data);

                        //@todo1. call History:add
                    });
                })
            }
        }
    }])

    .factory('SendQuery', ['$http', function($http) {
        return {
            send: function(query) {
                var request  = $http({
                    method: query.type,
                    url: query.url
                });
                return request;
            }
        }
    }
    ])

    .factory('HistoryService',['$http', '$rootScope', function($http, $rootScope){
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
                return $http.get('http://localhost:3000/history');
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
    }]);

//{
//
//}, {
//    get: { method: 'GET', params: { url: '@url'}, isArray: false}
//});
//http://localhost:3000/history