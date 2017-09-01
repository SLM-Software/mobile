SpotlightmartApp.controller('settingsCtrl', function ($scope, CordovaService, $location, $rootScope) {
    CordovaService.ready.then(function () {
        init();
        
        function init() {
        }
        
        $scope.SettingClick = function() {
            $location.path("/Settings/Personal");
        }
    });
});