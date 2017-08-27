SpotlightmartApp.controller('mdlAccountCtrl', function ($scope, CordovaService, $modalInstance) {
    CordovaService.ready.then(function () {
        
        init();
        
        function init() {
        }
                
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    });
});
