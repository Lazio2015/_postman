postman.controller('RestCtrl', ['$scope','$http', 'HistoryService', '$rootScope', function($scope, $http, HistoryService, $rootScope) {
    $scope.title = 'Rest API';

    }])
    .controller('ContactCrtl',['$scope', function($scope){
        $scope.title = 'Contact page';
    }])

    .controller('HistoryCtrl', ['$scope', 'HistoryService', '$rootScope', function($scope, HistoryService, $rootScope) {
        $scope.title = 'History page';
        HistoryService.getlist().success(function(cb) {
            $scope.history = cb;
        });

        $rootScope.$on('history:add', function(event, obj) {
            $rootScope.history.push(obj);
        });

        $scope.$on('history-delete', function(event, data) {
            $scope.history = data;
        });

    }]);




