SpotlightmartApp.controller('mdlItemDetailCtrl', function ($scope, CordovaService, $cordovaFile, $modalInstance, $uibModal, upc) {
    CordovaService.ready.then(function () {

        init();

        function init() {
        }

        $scope.Close = function() {
            $modalInstance.dismiss('cancel');
        }

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }

    });
});
