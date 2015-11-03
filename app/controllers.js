postman.controller('RestCtrl', ['$scope','$http', 'HistoryService', 'SendQuery', '$rootScope', function($scope, $http, HistoryService, SendQuery, $rootScope){
        $scope.title = 'Rest API';


        //HistoryService.findAllHistory(function(data){
        //    $scope.history = data;
        //    console.log(data);
        //});
        $scope.url = 'http://localhost:3000/history';
        $scope.query ={type:'GET', url: ''};
        //$scope.get = function() {
        //    SendQuery.send($scope.query).success(function(data) {
        //        $scope.data = data;
        //    });
        //console.log($scope.query);
        //    $rootScope.$broadcast('query:add', $scope.query);
        //
        //
        //};
        $scope.get = function() {
            $rootScope.$on('abc', function(e, data) {
                console.log('fdgdf');
                $scope.data = data;
            });
        }
    }])

    .controller('ContactCrtl',['$scope', function($scope){
        $scope.title = 'Contact page';
    }])

    .controller('HistoryCtrl', ['$scope', 'HistoryService', '$rootScope', function($scope, HistoryService, $rootScope) {
        $scope.title = 'History page';
        HistoryService.getlist().success(function(cb) {
            $scope.history = cb;
        });

        $scope.$on('query:add', function(event, query) {
            $scope.history.push(query);
            console.log(query.type);
            console.log(query.url);
        });

        $scope.delete = function(id){
            HistoryService.delete(id, function(data){
                $scope.history = data;
            });
        };

    }]);




