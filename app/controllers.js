postman
    .controller('RestCtrl', ['$scope', '$templateCache', '$localStorage', function($scope, $templateCache, $localStorage) {
        $scope.title = 'Rest API';

        //$scope.$on('sendData: response', function(e, data) {
        //    $scope.response = data;
        //});
        this.onResponse = function(data){
            $scope.response = data;
        }

        $scope.tabs = [{
            id:1,
            name: 'Default tab',
            content: "tabDefault",
            active: true
        }]

        $scope.counter = 1;
        /** Function to add a new tab **/
        $scope.addTab = function(){
            $scope.counter++;
            var tab = {
                id: $scope.counter,
                name: 'New tab '+$scope.counter,
                content: 'tab'+($scope.counter)
            };
            $templateCache.put(tab.content, '<send-data-rest on-response="onResponse()" on-history-add="onHistoryAdd()"></send-data-rest>');
            $scope.tabs.push({id:tab.id, name: tab.name, content: tab.content});
            $scope.selectedTab = $scope.tabs.length - 1; //set the newly added tab active.
            //console.log($scope.tabs);
            //console.log($templateCache.get(tab.content));
        }

        /** Function to delete a tab **/
        $scope.deleteTab = function(index){
            $scope.tabs.splice(index,1); //remove the object from the array based on index
        }

        $scope.selectedTab = 0; //set selected tab to the 1st by default.

        /** Function to set selectedTab **/
        $scope.selectTab = function(index){
            $scope.selectedTab = index;
        }
    }])

    .controller('ContactCrtl',['$scope', function($scope){
        $scope.title = 'Contact page';
    }])

    .controller('HistoryCtrl', ['$scope', function($scope) {
        $scope.title = 'Rest: History page';
        $scope.sortField = 'id';

        //$scope.$on('history: add', function(event, data) {
        //    $scope.history.push(data);
        //});

        this.onHistoryAdd = function(data) {
            $scope.history.push(data);
        }

        $scope.$on('history: delete', function(event, data) {
            $scope.history = data;
        });
    }])

    .controller('SendDataCtrl', ['$scope', function($scope) {
        $scope.title = 'Rest: SendData page';
        $scope.types = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'COPY', 'PATCH'];
        $scope.data = {
            type: 'GET',
            url: ''
        };

        $scope.$on('sendData: invoke', function(e, query) {
            $scope.$parent.response = '';
            $scope.data.type = query.type;
            $scope.data.url = query.url;
        });
    }]);



