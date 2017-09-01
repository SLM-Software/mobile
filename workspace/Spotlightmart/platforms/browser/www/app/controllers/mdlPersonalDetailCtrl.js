SpotlightmartApp.controller('mdlPersonalDetailCtrl', function ($scope, CordovaService, $modalInstance, $uibModal, field, value) {
    CordovaService.ready.then(function () {
        $scope.field = field;
        $scope.input = value;
        
        init();
        
        function init() {
        }
        
        $scope.Save = function() {
            
        }
        
        $scope.Close = function() {
            $modalInstance.dismiss('cancel');
        }
        
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }
        
        $scope.EditPhoto = function() {
            var options = {
              androidTheme : window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // material
              title: 'Profile Picture',
              subtitle: 'Please choose one of the option', // supported on iOS only
              buttonLabels: ['Take Picture', 'Choose From Album'],
              addCancelButtonWithLabel: 'Cancel',
              androidEnableCancelButton : true,
              winphoneEnableCancelButton : true,
            };
            window.plugins.actionsheet.show(options, function(buttonIndex) {
                alert("Button clicked : " + buttonIndex);
            });
        }
    });
});
