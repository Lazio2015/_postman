postman.controller('RestCtrl', ['$scope','$http', 'HistoryService', '$rootScope', function($scope, $http, HistoryService, $rootScope) {
    $scope.title = 'Rest API';

    $scope.$on('send:response', function(e, data) {
        $scope.response = data;
        console.log(2);
    });

    }])
    .controller('ContactCrtl',['$scope', function($scope){
        $scope.title = 'Contact page';
    }])

    .controller('HistoryCtrl', ['$scope', 'HistoryService', '$rootScope', function($scope, HistoryService) {
        $scope.title = 'Rest: History page';

        HistoryService.getlist().success(function(cb) {
            $scope.history = cb;
        });

        $scope.$on('history:add', function(event, obj) {
            $scope.history.push(obj);
        });

        $scope.$on('history-delete', function(event, data) {
            $scope.history = data;
        });

    }])

    .controller('SendDataCtrl', ['$scope', function($scope) {
        //$scope.title = 'Rest: SendData page';
        //
        //$rootScope.$on('main:response', function (e, res, history) {
        //    $scope.response = res;
        //    history.id = res.id;
        //    $scope.$broadcast('history:add', history);
        //});
        //
        //$scope.$on('addUrl', function(e, query) {
        //    console.log('2');
        //    query.url = jQuery(element).find('#url').val(query.url);
        //    query.type = jQuery(element).find('#type').val(query.type);
        //});
    }]);




