SpotlightmartApp.controller('mdlPersonalDetailCtrl', function ($scope, CordovaService, $cordovaFile, $modalInstance, $uibModal, field, user) {
    CordovaService.ready.then(function () {
        $scope.field = field;
        $scope.input;
        $scope.user = user;
        
        init();
        
        function init() {
            console.log("Initializing input");
            switch (field)
            {
                case "Photo":
                    $scope.input = $scope.user.photoSrc;
                    break;
                case "First name":
                    $scope.input = $scope.user.firstname;
                    break;
                case "Last name":
                    $scope.input = $scope.user.lastname;
                    break;
                case "Phone":
                    $scope.input = $scope.user.phone;
                    break;
                case "Address":
                    $scope.input = $scope.user.address;
                    break;
                case "City":
                    $scope.input = $scope.user.city;
                    break;
                case "State":
                    $scope.input = $scope.user.state;
                    break;
                case "Country":
                    $scope.input = $scope.user.country;
                    break;
                case "Email":
                    $scope.input = $scope.user.email;
                    break;
                case "Zip":
                    $scope.input = $scope.user.zip;
                    break;
            }
        }
        
        $scope.Save = function() {
            switch (field)
            {
                case "Photo":
                    $scope.user.photoSrc = $scope.input;
                    break;
                case "First name":
                    $scope.user.firstname = $scope.input;
                    break;
                case "Last name":
                    $scope.user.lastname = $scope.input;
                    break;
                case "Phone":
                    $scope.user.phone = $scope.input;
                    break;
                case "Address":
                    $scope.user.address = $scope.input;
                    break;
                case "City":
                    $scope.user.city = $scope.input;
                    break;
                case "State":
                    $scope.user.state = $scope.input;
                    break;
                case "Country":
                    $scope.user.country = $scope.input;
                    break;
                case "Email":
                    $scope.user.email = $scope.input;
                    break;
                case "Zip":
                    $scope.user.zip = $scope.input;
                    break;
            }
            console.log("Saving %o to " + cordova.file.dataDirectory + USER_DATA_FILE, $scope.user);
            $cordovaFile.writeFile(cordova.file.dataDirectory, USER_DATA_FILE, JSON.stringify($scope.user), true).then(
                function(result) {
                    console.log("Successfully save user data to " + USER_DATA_FILE);
                    $modalInstance.close($scope.user);
                },
                function(error) {
                    console.log("Error when trying to save data to user.dat with error : %o", error);
                    alert("Failed to save user data, please try again");
                });
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
                            var binRawData;

                            console.log("Image from photo album : " + imgFile);
                            console.log("Moving " + cordova.file.tempDirectory + imgFile.substr(imgFile.lastIndexOf('/')+1, imgFile.length) + " to " + cordova.file.dataDirectory + "portrait.jpg");
                            //movePic(imgFile);
                            $cordovaFile.moveFile(
                                cordova.file.tempDirectory,
                                imgFile.substr(imgFile.lastIndexOf('/')+1, imgFile.length),
                                cordova.file.dataDirectory,
                                USER_PORTRAIT_FILE).then(
                                    function (result) {
                                        console.log("Image file moved successfully");
                                        $scope.input = cordova.file.dataDirectory + "portrait.jpg";
                                    },
                                    function (error) {
                                        console.log("Failed to move image file with error : %o", error);
                                        alert("Failed to set the profile picture, please try again.");
                                        return;
                                    }
                            );
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
            
            function saveJSON(fileName, jsonObj)
            {
                console.log("Saving %o to " + fileName, jsonObj);
                var res = $cordovaFile.writeFile(cordova.file.dataDirectory, fileName, JSON.stringify(jsonObj), true);
                console.log("Save result : %o", res);
            }
        
            function errorCallback(error)
            {
                console.log("Error : %o", error);
            }
        }
    });
});
