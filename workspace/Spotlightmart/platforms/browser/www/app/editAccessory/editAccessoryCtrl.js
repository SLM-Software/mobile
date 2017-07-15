CT6App.controller('editAccessoryCtrl', function ($scope, $route, CordovaService, $location, $rootScope, $routeParams, Configs, BackExercises, BicepsExercises, ShoulderExercises) {
    var exerciseType = $routeParams.exerciseType;
    $scope.title = exerciseType+" Exercises";
    $scope.exercises = [];
    $scope.exerciseName = {text: ''};
    $scope.selectedId = "";
    $scope.oConfig = null;
    
    // Get all the data depends on which type
    if (exerciseType == 'Back') {
        BackExercises.all().then(function(ex){
            $scope.exercises = ex;
        });
    }
    else if (exerciseType == 'Shoulder') {
        ShoulderExercises.all().then(function(ex) {
            $scope.exercises = ex;
        });
    }
    else if (exerciseType == 'Biceps') {
        BicepsExercises.all().then(function(ex) {
            $scope.exercises = ex;
        });
    }
    
    // Init the config object
    $scope.oConfig = Configs.all().then(function(resp) {
        if (resp.length > 0) {
            $scope.oConfig=resp[0];
            console.log("Config object : %o", $scope.oConfig);
        }
    });
    
    $scope.ShowDeleteExercise = function(id) {
        var oExercise;
        for (var i=0; i<$scope.exercises.length; i++) {
            if ($scope.exercises[i].ID==id)
                oExercise=$scope.exercises[i];
        }
        $scope.selectedId = id;
        navigator.notification.confirm(
            "Do you want to delete "+oExercise.Name+"?",
            $scope.ConfirmDeleteExercises,
            "Confirm",
            ["OK", "Cancel"]
        );
    }
    
    $scope.ConfirmDeleteExercises = function(buttonIndex) {
        if (buttonIndex == 1) { // OK button
            console.log("Deleting "+$scope.selectedId);
            if (exerciseType == 'Back') {
                // Check if config has the same id to be deleted, if so, reset it first
                console.log("Comparing "+$scope.selectedId+" of "+typeof($scope.selectedId)+" with "+$scope.oConfig.BackID+" of "+typeof($scope.oConfig.BackID));
                if (parseInt($scope.selectedId) == $scope.oConfig.BackID) {
                    Configs.resetAccessoryExercise('BackID').then(function(res) {
                        console.log("BackID resetted in Configs with result : %o", res);
                    });
                }
                BackExercises.deleteExercise($scope.selectedId).then(function(res){
                    if (res.rowsAffected > 0) {
                        $route.reload();
                    }
                    else {
                        navigator.notification.alert(
                            "Failed to delete "+$scope.selectedId+". Please try again later.",
                            null,
                            "Error",
                            "OK"
                        );
                    }
                });
            }
            else if (exerciseType == 'Shoulder') {
                if (parseInt($scope.selectedId) == $scope.oConfig.ShoulderID) {
                    Configs.resetAccessoryExercise('ShoulderID').then(function(res) {
                        console.log("ShoulderID resetted in Configs with result : %o", res);
                    });
                }
                ShoulderExercises.deleteExercise($scope.selectedId).then(function(res){
                    if (res.rowsAffected > 0) {
                        $route.reload();
                    }
                    else {
                        navigator.notification.alert(
                            "Failed to delete "+$scope.selectedId+". Please try again later.",
                            null,
                            "Error",
                            "OK"
                        );
                    }
                });
            }
            else if (exerciseType == 'Biceps') {
                if (parseInt($scope.selectedId) == $scope.oConfig.BicepsID) {
                    Configs.resetAccessoryExercise('BicepsID').then(function(res) {
                        console.log("BicepsID resetted in Configs with result : %o", res);
                    });
                }
                BicepsExercises.deleteExercise($scope.selectedId).then(function(res){
                    if (res.rowsAffected > 0) {
                        $route.reload();
                    }
                    else {
                        navigator.notification.alert(
                            "Failed to delete "+$scope.selectedId+". Please try again later.",
                            null,
                            "Error",
                            "OK"
                        );
                    }
                });
            }
        }
    }
    
    $scope.SaveAccessoryExercise = function() {
        if ($scope.exerciseName.text == "") {
            navigator.notification.alert(
                "Please enter a valid name",
                null,
                "Error",
                "OK"
            );
            return;
        }
        if (exerciseType == 'Back') {
            BackExercises.insertExercise($scope.exerciseName.text).then(function(res){
                if (res.rowsAffected > 0) {
                    $route.reload();
                }
                else {
                    navigator.notification.alert(
                        "Failed to insert "+$scope.exerciseName.text+". Please try again later.",
                        null,
                        "Error",
                        "OK"
                    );
                }
            });
        }
        else if (exerciseType == 'Shoulder') {
            ShoulderExercises.insertExercise($scope.exerciseName.text).then(function(res) {
                if (res.rowsAffected > 0) {
                    $route.reload();
                }
                else {
                    navigator.notification.alert(
                        "Failed to insert "+$scope.exerciseName.text+". Please try again later.",
                        null,
                        "Error",
                        "OK"
                    );
                }
            });
        }
        else if (exerciseType == 'Biceps') {
            BicepsExercises.insertExercise($scope.exerciseName.text).then(function(res) {
                if (res.rowsAffected > 0) {
                    $route.reload();
                }
                else {
                    navigator.notification.alert(
                        "Failed to insert "+$scope.exerciseName.text+". Please try again later.",
                        null,
                        "Error",
                        "OK"
                    );
                }
            });
        }
    }
});