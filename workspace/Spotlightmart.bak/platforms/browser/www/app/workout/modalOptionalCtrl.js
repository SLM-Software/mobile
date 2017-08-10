CT6App.controller('modalOptionalCtrl', function ($scope, $route, CordovaService, $filter, $modalInstance, OptionalExercises, CacheService) {
    $scope.title = "Optional Exercises";
    $scope.name = CacheService.get("SelectedOptionalName");
    $scope.exercises = [];
    $scope.exerciseName = {text: ''};
    $scope.selectedId = "";
    
    // Get all the optional exercises
    OptionalExercises.all().then(function(resp) {
        $scope.exercises=resp;
    });

    $scope.SelectExercise = function(optionalName) {
        CacheService.put($scope.name, optionalName);
        $modalInstance.close(optionalName);
    }
    
    $scope.ShowDeleteExercise = function(id) {
        console.log("Setting ID to "+id);
        $scope.selectedId = id;
        navigator.notification.confirm(
            "Do you want to delete "+$scope.exercises[id]+"?",
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