SpotlightmartApp.controller('settingsCtrl', function ($scope, CordovaService, $cordovaFile, $location, $rootScope) {
    CordovaService.ready.then(function () {
        $scope.oUser = null;

        init();
        
        function init() {
            $cordovaFile.readAsText(cordova.file.dataDirectory, USER_DATA_FILE).then(
                function (payload)
                {
                    console.log("User data read from file : %o", payload);
                    $scope.oUser = JSON.parse(payload);
                },
                function (error)
                {
                    console.log("Failed to read user data from file with error : %o", error);
                }
            )
        }
        
        $scope.SettingClick = function() {
            $location.path("/Settings/Personal");
        }

        $scope.WalletClick = function() {
            $location.path('/Settings/Wallet');
        }

        $scope.ShoppingListClick = function() {
            $location.path("/Settings/ShoppingList");
        }
    });
});