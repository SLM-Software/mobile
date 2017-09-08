SpotlightmartApp.factory('UserService', function($cordovaFile) {
    var oUser = null;
    var obj = {};

    obj.getUser  = function() {
        console.log("Initializing user object");
        if (oUser == null)
        {
            console.log("User is empty, need to read from user profile file");
            $cordovaFile.readAsText(cordova.file.dataDirectory, USER_DATA_FILE).then(
                function (userData) {
                    console.log("Successfully extract user profile data : " + userData);
                    oUser = JSON.parse(userData);
                    return oUser;
                },
                function (error) {
                    console.log("Failed to retrieve user profile data with error : %o", error);
                    return error;
                }
            );
        }
        else
        {
            console.log("User is not empty, returning user object : %o", oUser);
            return oUser;
        }
    };
    obj.saveUser = function(strUser) {
        $cordovaFile.writeFile(cordova.file.dataDirectory, USER_DATA_FILE, strUser, true).then(
            function (success) {
                console.log("Successfully save " + strUser + " to " + USER_DATA_FILE);
                oUser = JSON.parse(strUser);
            },
            function (error) {
                console.log("Failed to save " + strUser + " to " + USER_DATA_FILE + " with error: %o", error);
                actionFailed = true;
                lastException = error;
            }
        );
    };

    return obj;
});