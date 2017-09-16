SpotlightmartApp.controller('mdlItemDetailCtrl', function ($scope, CordovaService, $cordovaFile, $modalInstance, $uibModal, upc) {
    CordovaService.ready.then(function () {
        $scope.upc = upc;
        init();

        function init() {
        }

        $scope.Close = function() {
            $modalInstance.dismiss('cancel');
        }

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }

        $scope.ShowNavigation = function(upc) {
            navigator.notification.alert(
                "Please follow the LED lighting to navigate to product",
                function () {},
                "Notification",
                "OK"
            );
            $modalInstance.dismiss('cancel');
            return;
        }

        $scope.AddToShoppingList = function(upc) {
            navigator.notification.alert(
                "UPC " + $scope.upc + " saved successfully to shopping list",
                function () {},
                "Notification",
                "OK"
            );
            $modalInstance.dismiss('cancel');
            return;
        }
    });
});
