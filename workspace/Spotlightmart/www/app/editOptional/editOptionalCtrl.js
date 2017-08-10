CT6App.controller('editOptionalCtrl', function ($scope, $route, CordovaService, $filter, OptionalExercises, CacheService) {
    $scope.title = "Optional Exercises";
    $scope.exercises = [];
    $scope.exerciseName = {text: ''};
    $scope.selectedId = "";
    
    // Get all the optional exercises
    OptionalExercises.all().then(function(resp) {
        $scope.exercises=resp;
    });

    $scope.ShowDeleteExercise = function(id) {
        var oExercise;
        $scope.selectedId = id;
        for(var i=0; i<$scope.exercises.length; i++){
            if ($scope.exercises[i].ID==id)
                oExercise=$scope.exercises[i];
        }
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
            OptionalExercises.deleteExercise($scope.selectedId).then(function(res){
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
    
    $scope.SaveOptionalExercise = function() {
        if ($scope.exerciseName.text == "") {
            navigator.notification.alert(
                "Please enter a valid name",
                null,
                "Error",
                "OK"
            );
            return;
        }
        OptionalExercises.insertExercise($scope.exerciseName.text).then(function(res){
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
});