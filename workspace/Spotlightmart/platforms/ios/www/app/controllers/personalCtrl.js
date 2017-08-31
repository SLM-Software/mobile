SpotlightmartApp.controller('personalCtrl', function ($scope, CordovaService, $location, $rootScope, $uibModal) {
    CordovaService.ready.then(function () {
        $scope.photoSrc="img/40x40_portrait.jpg";
        $scope.firstname = "Joe";
        $scope.lastname = "Blow";
        $scope.phone = "555-555-5555";
        $scope.address = "111 My Street";
        $scope.city = "My City";
        $scope.state = "CA";
        $scope.country = "US";
        $scope.email = "joe.blow@blowme.com";
        $scope.zip = "99999";
        init();
        
        function init() {};
        
        $scope.Edit = function(field) {
            var value = "";
            switch (field)
            {
                case "Photo":
                    value = $scope.photoSrc;
                    break;
                case "First name":
                    value = $scope.firstname;
                    break;
                case "Last name":
                    value = $scope.lastname;
                    break;
                case "Phone":
                    value = $scope.phone;
                    break;
                case "Address":
                    value = $scope.address;
                    break;
                case "City":
                    value = $scope.city;
                    break;
                case "State":
                    value = $scope.state;
                    break;
                case "Country":
                    value = $scope.country;
                    break;
                case "Email":
                    value = $scope.email;
                    break;
                case "Zip":
                    value = $scope.zip;
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
            });
        }
    });
});