SpotlightmartApp.controller('personalCtrl', function ($scope, CordovaService, $location, $rootScope, $uibModal) {
    CordovaService.ready.then(function () {
        var oUser = {
            firstname : "Joe",
            lastname : "Blow",
            phone : "555-555-5555",
            address : "111 My Street",
            city : "My City",
            state : "CA",
            country : "US",
            zip : "99999",
            email : "joe.blow@blowme.com",
            photoSrc : "img/40x40_portrait.jpg"
        };
        $scope.user = oUser;
        init();
        
        function init() {};
        
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