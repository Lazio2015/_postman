postman
    .controller('RestCtrl', ['$scope', function($scope) {
        $scope.title = 'Rest API';

        $scope.$on('sendData: response', function(e, data) {
            $scope.response = data;
        });
    }])

    .controller('ContactCrtl',['$scope', function($scope){
        $scope.title = 'Contact page';
    }])

    .controller('HistoryCtrl', ['$scope', function($scope) {
        $scope.title = 'Rest: History page';

        $scope.$on('history: add', function(event, data) {
            $scope.history.push(data);
        });

        $scope.$on('history: delete', function(event, data) {
            $scope.history = data;
        });
    }])

    .controller('SendDataCtrl', ['$scope', function($scope) {

    }]);




