SpotlightmartApp.controller('settingsCtrl', function ($scope, CordovaService, $location, $rootScope) {
    CordovaService.ready.then(function () {
        $scope.SettingClick = function() {
            location.href = "/index.html#/Personal";
        }
    });
});