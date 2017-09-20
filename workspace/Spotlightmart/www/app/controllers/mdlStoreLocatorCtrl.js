SpotlightmartApp.controller('mdlStoreLocatorCtrl', function ($scope, CordovaService, $cordovaFile, $modalInstance, $uibModal) {
    CordovaService.ready.then(function () {
        const SAN_FRANCISCO = { "lat" : "37.773972", "long" : "-122.431297" };
        $scope.map;

        init();

        function init() {
            var result = document.getElementsByClassName("map");
            console.log("Result : %o", result);
            var angMap = angular.element(result[0]);
            console.log("Angular element : %o", angMap);
            var divMap = angMap.get(0);
            console.log("Map div : %o", divMap);
            var map = plugin.google.maps.Map.getMap(result[0]);
            $scope.map = map;
            console.log("Map object : %o", $scope.map);
            $scope.map.addEventListener(plugin.google.maps.event.MAP_READY, function (map) {
                console.log("Map Ready for %o", result[0]);
                map.setDiv(result[0]);
                //map.setVisible(true);
                map.showDialog();
                console.log("Map object : %o", map);
            });
        }

        function onMapReady() {
            console.log("Setting map to visible");
            $scope.map.setVisible(true);
        }

        $scope.Close = function() {
            $modalInstance.dismiss('cancel');
        }

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }

    });
});
