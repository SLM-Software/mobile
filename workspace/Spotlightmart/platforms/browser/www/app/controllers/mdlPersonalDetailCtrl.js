SpotlightmartApp.controller('mdlPersonalDetailCtrl', function ($scope, CordovaService, $modalInstance, $uibModal, field, value) {
    CordovaService.ready.then(function () {
        $scope.field = field;
        $scope.input = value;
        
        init();
        
        function init() {
        }
        
        $scope.Save = function() {
            
        }
        
        $scope.Close = function() {
            $modalInstance.dismiss('cancel');
        }
        
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    });
});
