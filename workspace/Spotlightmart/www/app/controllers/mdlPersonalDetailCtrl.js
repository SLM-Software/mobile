SpotlightmartApp.controller('mdlPersonalDetailCtrl', function ($scope, CordovaService, $modalInstance, $uibModal, field, value) {
    CordovaService.ready.then(function () {
        $scope.field = field;
        $scope.input = value;
        
        init();
        
        function init() {
        }
        
        $scope.Save = function() {
            $modalInstance.close($scope.input);
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
                // Take a picture
                if (buttonIndex == 1)
                {
                    navigator.camera.getPicture(
                        function(rawData)
                        {
                            console.log("Image from camera : " + rawData);
                        },
                        function(error)
                        {
                            alert("Photo error : " + error);
                        },
                        { 
                            quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            encodingType: Camera.EncodingType.JPEG,
                            sourceType: Camera.PictureSourceType.CAMERA
                        }
                    );
                }
                // Select from album
                else if (buttonIndex == 2)
                {
                    navigator.camera.getPicture(
                        function(imgFile)
                        {
                            console.log("Image from photo album : " + imgFile);
                            movePic(imgFile);
                        },
                        function(error)
                        {
                            alert("Photo album error : " + error);
                        },
                        { 
                            quality: 50,
                            destinationType: Camera.DestinationType.FILE_URI,
                            encodingType: Camera.EncodingType.JPEG,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                        }
                    );
                }
            });
            
            function movePic(fileUri){ 
                window.resolveLocalFileSystemURL(
                    fileUri,
                    function(fileEntry){
                        newFileUri  = cordova.file.dataDirectory;
                        oldFileUri  = fileUri;
                        fileExt     = "." + oldFileUri.split('.').pop();

                        newFileName = "portrait.jpg";
                        window.resolveLocalFileSystemURL(newFileUri,
                        function(dirEntry) {
                            // move the file to a new directory and rename it
                            fileEntry.moveTo(
                                dirEntry, 
                                newFileName, 
                                function() {
                                    console.log(cordova.file.dataDirectory + newFileName + " saved successfully");
                                    $scope.input = cordova.file.dataDirectory + newFileName;
                                    $scope.$apply();
                                }, 
                                errorCallback);
                            },
                            errorCallback);
                    },
                    errorCallback
                );
            }
            
            function errorCallback(error)
            {
                console.log("Error : %o", error);
            }
        }
    });
});
