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
            var value = "";
            switch (field)
            {
                case "Photo":
                    value = $scope.user.photoSrc;
                    break;
                case "First name":
                    value = $scope.user.firstname;
                    break;
                case "Last name":
                    value = $scope.user.lastname;
                    break;
                case "Phone":
                    value = $scope.user.phone;
                    break;
                case "Address":
                    value = $scope.user.address;
                    break;
                case "City":
                    value = $scope.user.city;
                    break;
                case "State":
                    value = $scope.user.state;
                    break;
                case "Country":
                    value = $scope.user.country;
                    break;
                case "Email":
                    value = $scope.user.email;
                    break;
                case "Zip":
                    value = $scope.user.zip;
                    break;
            }
            console.log("Editing " + field + " with " + value);
            var mdlEdit = $uibModal.open({
                                animation: true,
                                templateUrl: 'app/modals/personaldetail.html',
                                controller: 'mdlPersonalDetailCtrl',
                                backdrop: 'static',
                                resolve: {
                                    field: function () {
                                        return field;
                                    },
                                    value: function () {
                                        return value;
                                    }
                                }
                            });
            
            mdlEdit.result.then(function(user) {
                console.log("Modal close with result : %o", user);
            });
        }
    });
});