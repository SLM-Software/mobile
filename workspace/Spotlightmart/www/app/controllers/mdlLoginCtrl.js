SpotlightmartApp.controller('mdlLoginCtrl', function ($scope, CordovaService, $modalInstance, UserService) {
    CordovaService.ready.then(function () {
        $scope.username;
        $scope.password;
        
        init();
        
        function init() {
            UserService.initDB();
        }
        
        $scope.login = function() {
            
        }
        
        $scope.facebookLogin = function() {
            
        }
        
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    });
});
