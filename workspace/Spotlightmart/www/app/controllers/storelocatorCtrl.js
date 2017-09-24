SpotlightmartApp.controller('storeLocatorCtrl', function ($scope, CordovaService, $cordovaFile, NgMap) {
    CordovaService.ready.then(function () {
        const SAN_FRANCISCO = { "latitude" : 37.773972, "longitude" : -122.431297 };
        $scope.stores = [
            { "name" : 'Palace of fine arts', "address" : "Same address as Palace of fine arts", "latitude" : 37.801663, "longitude" : -122.447909 },
            { "name" : 'Pier 39', "address" : "Somewhere near the pier", "latitude" : 37.8096506, "longitude" :  -122.410249 }
        ];
        $scope.currentPostition;
        $scope.map;

        init();

        function init() {

            $scope.currentPosition = SAN_FRANCISCO;
            navigator.geolocation.getCurrentPosition(
                // Success
                function (position) {
                    console.log("Current position from geolocation : %o", position);
                    initMap($scope.currentPosition);
                },
                // Error
                function (error) {
                    console.log("Failed to retrieve geolocation with error : %o", error);
                    alert("Failed to retrieve location, using default location");

                    initMap($scope.currentPosition);
                },
                // Options
                { maximumAge : 3000, timeout : 5000, enableHighAccuracy : true}
            );

        }

        function initMap(coords)
        {
            NgMap.getMap().then(function(map) {
                $scope.map = map;
                map.setCenter(new google.maps.LatLng(coords.latitude, coords.longitude));
                map.setZoom(12);
                map.setOptions({ disableDefaultUI : true });
                var GeoMarker = new GeolocationMarker(map);
                initStoreMarkers(map);
            });
        }

        function initStoreMarkers(map)
        {
            var bounds = new google.maps.LatLngBounds();
            var storeWindow = new google.maps.InfoWindow();
            var infowindow = new google.maps.InfoWindow();
            var marker, i;

            bounds.extend(map.getCenter());

            for (i = 0; i < $scope.stores.length; i++) {
                var oStore = $scope.stores[i];
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(oStore.latitude, oStore.longitude),
                    map: map
                });

                bounds.extend(marker.getPosition());

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        var service = new google.maps.DistanceMatrixService();
                        service.getDistanceMatrix(
                            {
                                origins : [new google.maps.LatLng($scope.currentPosition.latitude, $scope.currentPosition.longitude)],
                                destinations : [new google.maps.LatLng($scope.stores[i].latitude, $scope.stores[i].longitude)],
                                travelMode : 'DRIVING',
                                unitSystem : google.maps.UnitSystem.IMPERIAL
                            }, function (response, status)
                            {
                                console.log("Distance matrix status : %o", status);
                                console.log("Distance matrix response : %o", response);
                                var distance = "--";
                                var time = "--";

                                if (status == "OK")
                                {
                                    distance = response.rows[0].elements[0].distance.text;
                                    time = response.rows[0].elements[0].duration.text;
                                }
                                infowindow.setContent("<b>" + $scope.stores[i].name + "</b><p>" + $scope.stores[i].address + "</p><small><i class=\"fa fa-road\">" + distance + "</i>&nbsp;<i class=\"fa fa-clock-o\">" + time + "</i></small>");
                                infowindow.open(map, marker);
                            }
                        );
                    }
                })(marker, i));
            }
            map.fitBounds(bounds);
        }

        $scope.CenterMap = function()
        {
            console.log("Centering map");
            $scope.map.setCenter(new google.maps.LatLng($scope.currentPosition.latitude, $scope.currentPosition.longitude));
        }
    });
});
