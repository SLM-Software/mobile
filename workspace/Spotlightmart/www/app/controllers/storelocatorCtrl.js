SpotlightmartApp.controller('storeLocatorCtrl', function ($scope, CordovaService, $cordovaFile, NgMap) {
    CordovaService.ready.then(function () {
        const SAN_FRANCISCO = { "latitude" : 37.773972, "longitude" : -122.431297 };
        const stores = [
            { "name" : 'Palace of fine arts', "latitude" : 37.801663, "longitude" : -122.447909 },
            { "name" : 'Pier 39', "latitude" : 37.8096506, "longitude" :  -122.410249 }
        ];
        //$scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?" + GOOGLE_MAP_JS_API_KEY;

        init();

        function init() {

            var currentPosition;
            navigator.geolocation.getCurrentPosition(
                // Success
                function (position) {
                    console.log("Current position from geolocation : %o", position);
                    initMap(SAN_FRANCISCO);
                },
                // Error
                function (error) {
                    console.log("Failed to retrieve geolocation with error : %o", error);
                    alert("Failed to retrieve location, using default location");
                    initMap(SAN_FRANCISCO);
                },
                // Options
                { maximumAge : 3000, timeout : 5000, enableHighAccuracy : true}
            );

        }

        function initMap(coords)
        {
            NgMap.getMap().then(function(map) {
                map.setCenter(new google.maps.LatLng(coords.latitude, coords.longitude));
                map.setZoom(12);
                map.setOptions({ disableDefaultUI : true });
                var GeoMarker = new GeolocationMarker(map);
                initStoreMarkers(map);
            });
        }

        function initStoreMarkers(map)
        {
            var markers = [];
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(map.getCenter());
            for (var i=0; i < stores.length; i++) {
                markers[i] = new google.maps.Marker({
                    position : new google.maps.LatLng(stores[i].latitude, stores[i].longitude),
                    map : map,
                    title : stores[i].name,
                    animation : google.maps.Animation.DROP
                });
                bounds.extend(markers[i].getPosition());
                console.log("Marker " + i + " : %o", markers[i]);
            }
            map.fitBounds(bounds);
        }
    });
});
