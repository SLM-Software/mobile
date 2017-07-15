CT6App.controller('setupCtrl', function ($scope, CordovaService, CacheService,$location, $rootScope, BackExercises, BicepsExercises, ShoulderExercises, Configs, dateService, $filter) {
    CordovaService.ready.then(function () {
    
    $scope.backExercises = [];
    $scope.bicepsExercises = [];
    $scope.shoulderExercises = [];
    $scope.btnKGCss = "";
    $scope.btnLBCss = "";
    $scope.arrStartWeeks = dateService.getStartWeeks();
    /*$scope.UOM = "";
    $scope.backExercisesIDSelected = "";
    $scope.bicepsExercisesIDSelected = "";
    $scope.shoulderExercisesIDSelected = "";
    $scope.bench1RM = "";
    $scope.squat1RM = "";
    $scope.deadlift1RM = "";
    $scope.startWeek = null;*/
    $scope.objSetup = { UOM:"", backExercisesIDSelected:"", bicepsExercisesIDSelected:"", shoulderExercisesIDSelected:"", bench1RM:"", squat1RM:"", deadlift1RM:"", startWeek:null, StartDate:null};
    
    // Get all the back exercises
    BackExercises.all().then(function(ex){
        $scope.backExercises = ex;
    });
    
    // Get all the biceps exercises
    BicepsExercises.all().then(function(ex){
        $scope.bicepsExercises = ex;
    });
    
    // Get all the shoulder exercises
    ShoulderExercises.all().then(function(ex) {
        $scope.shoulderExercises = ex;
    });

    init();
        
    // Event handler for editing accessory exercises
    $scope.EditAccessoryExercise = function(type) {
        CacheService.put('objSetup', $scope.objSetup);
        $location.path('/EditAccessory/'+type);
    };
    
    $scope.EditOptional = function() {
        CacheService.put('objSetup', $scope.objSetup);
        $location.path('/EditOptional');    
    };
        
    // Default constructor
    function init() {
        if (CacheService.get('objSetup') != null) {
            $scope.objSetup = CacheService.get('objSetup');
            CacheService.remove('objSetup');
            $scope.arrStartWeeks.unshift({id:0, date:$scope.objSetup.StartDate});
            initUOM($scope.objSetup.UOM);
            cleanupWeekArray();
            checkAccessoryExercises();
        }
        else {
            Configs.all().then(function(resp){
                if (resp.length > 0) {
                    var oConfig = resp[0];
            
                    $scope.arrStartWeeks.unshift({id:0, date:oConfig.StartDate});
                    $scope.objSetup.StartDate=oConfig.StartDate;
                    $scope.objSetup.startWeek='0';
                    $scope.objSetup.UOM=oConfig.UOM;
                    $scope.objSetup.bench1RM=oConfig.Bench1RM;
                    $scope.objSetup.squat1RM=oConfig.Squat1RM;
                    $scope.objSetup.deadlift1RM=oConfig.Deadlift1RM;
                    $scope.objSetup.backExercisesIDSelected=oConfig.BackID.toString();
                    $scope.objSetup.bicepsExercisesIDSelected=oConfig.BicepsID.toString();
                    $scope.objSetup.shoulderExercisesIDSelected=oConfig.ShoulderID.toString();
                    console.log("Config object : %o", $scope.objSetup);
                    initUOM($scope.objSetup.UOM);
                    cleanupWeekArray();
                    checkAccessoryExercises();
                }
            });    
        }
    }
    
    function checkAccessoryExercises() {
        if ($scope.backExercises[$scope.objSetup.backExercisesIDSelected]==null)
            $scope.objSetup.backExercisesIDSelected=null;
        if ($scope.bicepsExercises[$scope.objSetup.bicepsExercisesIDSelected]==null)
            $scope.objSetup.bicepsExercisesIDSelected=null;
        if ($scope.shoulderExercises[$scope.objSetup.shoulderExercisesIDSelected]==null)
            $scope.objSetup.shoudlderExercisesIDSelected=null;        
    }
        
    function cleanupWeekArray() {
        // Cleanup of the weeks array to avoid duplicates
        for (var i=1; i<$scope.arrStartWeeks.length; i++) {
            var objWeek = $scope.arrStartWeeks[i];
            if (objWeek.date==$scope.objSetup.StartDate) {
                $scope.arrStartWeeks.splice(i, 1);                    
            }
        }
    }
    function initUOM(UOM) {
        if (UOM=='KG') {
            $scope.btnKGCss = "btn-primary"; $scope.btnLBCss = "";
            $scope.objSetup.UOM ='KG';
        }
        else if (UOM=='LB'){
            $scope.btnLBCss = "btn-primary"; $scope.btnKGCss = "";
            $scope.objSetup.UOM='LB';
        }
    }
    // Event handler for KG/LB button
    $scope.UOMClick = function(uom) {
        $scope.objSetup.UOM = uom;
        if (uom=='KG') {
            $scope.btnKGCss = "btn-primary"; $scope.btnLBCss = "";
        }
        else {
            $scope.btnLBCss = "btn-primary"; $scope.btnKGCss = "";
        }
    }
    
    // Event handler for Save Click
    $scope.SaveClick = function() {
        // First, check for invalid input from the page
        var regEx = "/^\d+$/";
        var invalidField=[];
        var saveData=[];
        if ($scope.objSetup.startWeek == null) { invalidField.push("Start Week"); }
        if ($scope.objSetup.UOM == "") { invalidField.push("Unit of Measurement"); }
        if ($scope.objSetup.bench1RM == "" || !/^\d+$/.test($scope.objSetup.bench1RM)) { invalidField.push("Bench Press 1RM"); }
        if ($scope.objSetup.squat1RM == "" || !/^\d+$/.test($scope.objSetup.squat1RM)) { invalidField.push("Squat 1RM"); }
        if ($scope.objSetup.deadlift1RM == "" || !/^\d+$/.test($scope.objSetup.deadlift1RM)) { invalidField.push("Deadlift 1RM"); }
        if ($scope.objSetup.backExercisesIDSelected == "") { invalidField.push("Back Exercise"); }
        if ($scope.objSetup.bicepsExercisesIDSelected == "") { invalidField.push("Biceps exercise"); }
        if ($scope.objSetup.shoulderExercisesIDSelected == "") { invalidField.push("Shoudler exercise"); }

        if (invalidField.length > 0) {
            console.log("These fields are invalid : %o", invalidField);

            var strInvalidFields = "";
            angular.forEach(invalidField, function(key, value) {
                strInvalidFields+=key+"\n";
            });
            
            navigator.notification.alert(
                'Please check the value for these fields:\n'+strInvalidFields,
                null,
                'Error',
                'OK'
            )
            return;
        }
        
        // Now, we will construct the json array
        var selectedStartWeek;// = $filter('filter')($scope.arrStartWeeks, {id: $scope.startWeek}, true)[0];
        for (var i=0; i< $scope.arrStartWeeks.length; i++) {
            var objWeek = $scope.arrStartWeeks[i];
            if (objWeek.id == $scope.objSetup.startWeek)
                selectedStartWeek=objWeek;
        }
        console.log("Selected start week : %o",selectedStartWeek);
        saveData.push(selectedStartWeek.date);
        saveData.push($scope.objSetup.UOM);
        saveData.push($scope.objSetup.bench1RM);
        saveData.push($scope.objSetup.squat1RM);
        saveData.push($scope.objSetup.deadlift1RM);
        saveData.push($scope.objSetup.backExercisesIDSelected);
        saveData.push($scope.objSetup.bicepsExercisesIDSelected);
        saveData.push($scope.objSetup.shoulderExercisesIDSelected);
        saveData.push(selectedStartWeek.date);
        saveData.push(null);

        // All fields are good to go, first we delete the configs table
        Configs.delete().then(function(resp) {
            console.log("Delete result : %o", resp);
        });
        
        // Now saving it
        Configs.insert(saveData).then(function(resp) {
            console.log("Insert result : %o", resp);
            if (resp.rowsAffected > 0) {
                navigator.notification.alert(
                    'Configuration saved successfully',
                    null,
                    'Info',
                    'OK'
                );
            }
            else {
                navigator.notification.alert(
                    'Configuration cannot be saved, please try again!',
                    null,
                    'Error',
                    'OK'
                );
            }
        });
    }
    });
});