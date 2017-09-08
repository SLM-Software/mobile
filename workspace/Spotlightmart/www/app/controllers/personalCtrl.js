SpotlightmartApp.controller('personalCtrl', function ($scope, CordovaService, UserService, $cordovaFile, $location, $rootScope, $uibModal) {
    CordovaService.ready.then(function () {
        $scope.oUser;
        init();
        
        function init() {
            console.log("Reading user profile from : " + cordova.file.dataDirectory + USER_DATA_FILE);
            $cordovaFile.readAsText(cordova.file.dataDirectory, USER_DATA_FILE).then(
                function (data) {
                    console.log("User data read from file : %o", data);
                    var oUser = JSON.parse(data);
                    $scope.user = oUser;
                },
                function (error) {
                    console.log("Failed to read user profile with error : %o", error);
                    alert("Failed to read user profile, please try again.");
                }
            );
        }
        
        $scope.Edit = function(field) {
            console.log("Editing " + field);
            var mdlEdit = $uibModal.open({
                                animation: true,
                                templateUrl: 'app/modals/personaldetail.html',
                                controller: 'mdlPersonalDetailCtrl',
                                backdrop: 'static',
                                resolve: {
                                    field: function () {
                                        return field;
                                    },
                                    user: function () {
                                        return $scope.user;
                                    }
                                }
                            });
            
            mdlEdit.result.then(function(user) {
                console.log("Modal close with result : %o", user)
                $scope.user = user;
            });
        }
    });
});