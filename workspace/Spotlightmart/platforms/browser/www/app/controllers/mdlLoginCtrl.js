SpotlightmartApp.controller('mdlLoginCtrl', function ($scope, CordovaService, $modalInstance, $uibModal, ngFB) {
    CordovaService.ready.then(function () {
        $scope.username;
        $scope.password;
        
        console.log("Initing FB with " + FB_APP_ID);
        ngFB.init({appId: '1915895988671514'});
        init();
        
        function init() {
        }
        
        $scope.login = function() {
            
        }
        
        $scope.facebookLogin = function() {
            console.log("Logging in to FB...");
            ngFB.login({scope: 'email,read_stream,publish_actions'})
                .then(
                    function(response) {
                        alert('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);
                    },
                    function(error) {
                        alert('Facebook login failed: ' + error);
                    });
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
