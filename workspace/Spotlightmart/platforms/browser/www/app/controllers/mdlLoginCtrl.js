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
            console.log("Logging in to FB...");
            //$cordovaOauth.facebook(FB_APP_ID, FB_APP_PERMISSION, {redirect_uri : //"http://localhost:8000/callback"}).then(
            //    function(result){
            //        alert('Facebook login succeeded, got access token: ' + //result.authresponse.accessToken);    
            //    },
            //    function(error){
            //        alert('Facebook login failed: ' + error);
            //    }
            //);
            facebookConnectPlugin.login(FB_APP_PERMISSION,
                    function(response) {
                        alert('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);
                    },
                    function(error) {
                        //alert('Facebook login failed: ' + error);
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
