SpotlightmartApp.controller('mdlLoginCtrl', function ($scope, CordovaService, $modalInstance, $uibModal) {
    CordovaService.ready.then(function () {
        $scope.username;
        $scope.password;
        
        init();
        
        function init() {
        }
        
        $scope.login = function() {
            
        }
        
        $scope.facebookLogin = function() {
            facebookConnectPlugin.browserInit("1915895988671514");
            facebookConnectPlugin.login(["public_profile"], 
                function (result) {
                    console.log("FB Result : %o", result);
                },
                function (error) {
                    alert(error);
                }
            );
        }
        
        $scope.CreateAccount = function() {
            $modalInstance.dismiss('cancel');
            
            var mdlAccount = $uibModal.open({
                animation: true,
                templateUrl: 'app/modals/newaccount.html',
                controller: 'mdlAccountCtrl',
                backdrop: 'static'
            });
            
            mdlAccount.result.then(function(user) {
            });

        }
        
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
    });
});
