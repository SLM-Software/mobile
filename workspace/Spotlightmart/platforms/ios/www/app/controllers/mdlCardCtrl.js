SpotlightmartApp.controller('mdlCardCtrl', function ($scope, CordovaService, $cordovaFile, $modalInstance, $uibModal, card, title) {
    CordovaService.ready.then(function () {
        $scope.oCard = card;
        $scope.title = title;
        init();

        function init() {
            if ($scope.oCard == null)
            {
                $scope.oCard = { cardno : "",
                                 expmonth : "",
                                 expyear : "",
                                 name : "",
                                 cvv : "" };
            }
        }

        $scope.save = function() {
            $modalInstance.close($scope.oCard);
        }

        $scope.Close = function() {
            $modalInstance.dismiss('cancel');
        }

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }

    });
});
