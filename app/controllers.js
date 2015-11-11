postman
    .controller('RestCtrl', ['$scope', '$templateCache', function($scope, $templateCache) {
        $scope.title = 'Rest API';

        $scope.$on('sendData: response', function(e, data) {
            $scope.response = data;
        });

        //$scope.tabs = [{
        //    id:1,
        //    name: 'Default tab',
        //    content: "app/rest/views/directive.html"
        //}]
        //
        //$scope.counter = 1;
        ///** Function to add a new tab **/
        //$scope.addTab = function(){
        //    $scope.counter++;
        //    $scope.tabs.push({id:$scope.counter, name: 'New tab '+$scope.counter, content: "app/rest/views/directive1.html"});
        //    $scope.selectedTab = $scope.tabs.length - 1; //set the newly added tab active.
        //}
        //
        ///** Function to delete a tab **/
        //$scope.deleteTab = function(index){
        //    $scope.tabs.splice(index,1); //remove the object from the array based on index
        //}
        //
        //$scope.selectedTab = 0; //set selected tab to the 1st by default.
        //
        ///** Function to set selectedTab **/
        //$scope.selectTab = function(index){
        //    $scope.selectedTab = index;
        //}
        $scope.items = [];
        $scope.includeItems = [];
      //  $scope.directiveItems = [];
        $scope.directiveItems = [{
            id:1,
            name: 'Default tab',
            content: "app/rest/views/directive.html"
        }]

        for (var i = 0; i < 10; i ++)
            $scope.items.push({ id: i, template: "directive.html" });

        $templateCache.put("directive.html", "id: {{ item.id }}");

        window.testScope = $scope;
    }])

    .controller('ContactCrtl',['$scope', function($scope){
        $scope.title = 'Contact page';
    }])

    .controller('HistoryCtrl', ['$scope', function($scope) {
        $scope.title = 'Rest: History page';
        $scope.sortField = 'id';

        $scope.$on('history: add', function(event, data) {
            $scope.history.push(data);
        });

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
;




