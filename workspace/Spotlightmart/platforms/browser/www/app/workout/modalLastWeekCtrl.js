CT6App.controller('modalLastWeekCtrl', function ($scope, CordovaService, $location, $rootScope, CacheService, Configs, dateService, $filter, $window, $modalInstance, $route) {
    CordovaService.ready.then(function () {
        // Initialize
        init();
        
        // Variable declaration
        $scope.oConfig=null;
        $scope.lastWeekOption=null;
        
        // Default constructor
        function init() {
            Configs.all().then(function(resp) {
                if (resp.length > 0) {
                    $scope.oConfig = resp[0];
                }
            });
        }
        
        // Option button event handler
        $scope.OptionClicked = function (option) {
            Configs.saveWeek6Option(option).then(function(resp) {
                $modalInstance.close(option);
            });
        }
    });
});