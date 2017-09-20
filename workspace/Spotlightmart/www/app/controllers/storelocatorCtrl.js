SpotlightmartApp.controller('storeLocatorCtrl', function ($scope, CordovaService, $cordovaFile, NgMap) {
    CordovaService.ready.then(function () {
        const SAN_FRANCISCO = { "lat" : "37.773972", "long" : "-122.431297" };
        const stores = [
            ['Union Square', 40.735863, -73.991084],
            ['Mission District', 37.792234, -122.394154]
        ];
        $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?" + GOOGLE_MAP_JS_API_KEY;

        init();

        function init() {
            console.log("Lazy loading google map JS API with URL : " + $scope.googleMapsUrl);
            NgMap.getMap().then(function(map) {
                map.setCenter(new google.maps.LatLng(37.787994, -122.407437));
                map.setZoom(12);
                for (var i=0; i < stores.length; i++) {
                    console.log("Adding " + stores[i][0] + " mmarker");
                    var marker = new google.maps.Marker({
                        position : new google.maps.LatLng(stores[i][1], stores[i][2]),
                        map : map,
                        animation : google.maps.Animation.DROP
                    })
                };
            })
        }

    });
});
