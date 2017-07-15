CT6App.controller('calendarCtrl', function ($scope, CordovaService, $location, $rootScope, CacheService, Configs, dateService, $filter, $window, $route) {
    CordovaService.ready.then(function() {
        init();
        
        $scope.dt=new Date();  
        $scope.minDate=null;
        $scope.dateSelected = function() {
            $location.path("/Home/"+$scope.dt.toDateString());
        }
        function init() {
            Configs.all().then(function(resp){
                $scope.minDate=new Date(resp[0].StartDate);
            });
        }
    });
});