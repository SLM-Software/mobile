SpotlightmartApp.controller('personalCtrl', function ($scope, CordovaService, $cordovaFile, $location, $rootScope, $uibModal) {
    CordovaService.ready.then(function () {
        $scope.user;
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
                    $scope.user = { firstname : "Joe",
                                     lastname : "blow",
                                     phone : "555-555-5555",
                                     email : "joe.blow@bloeme.com",
                                     address : "123 My Street",
                                     city : "My City",
                                     state : "CA",
                                     zip : "99999",
                                     country : "US",
                                     photoSrc : "~/img/40x40_portrait.jpg"};
                    console.log("Initing to default user object : %o", $scope.oUser);
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