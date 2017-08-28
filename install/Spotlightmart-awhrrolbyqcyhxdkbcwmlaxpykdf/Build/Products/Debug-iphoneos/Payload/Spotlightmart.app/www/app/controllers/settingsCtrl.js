SpotlightmartApp.controller('settingsCtrl', function ($scope, CordovaService, $location, $rootScope) {
    CordovaService.ready.then(function () {
        $scope.SettingClick = function() {
            $location.path("/Settings/Personal");
        }
    });
});