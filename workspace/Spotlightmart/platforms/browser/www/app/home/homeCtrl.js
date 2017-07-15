SpotlightmartApp.controller('homeCtrl', function ($scope, CordovaService, $location, $rootScope) {
    // generate 40 cards
    $scope.name = "John Doe";
    $scope.cards = [];
    var types = ['cats','fashion','nature','food','abstract','nightlife'];
    for (var i=0; i<40; i++){
        var t = types[i % types.length];
        $scope.cards.push({image:'http://lorempixel.com/198/198/' + t + '/'+((i%10)+1), title: t});
    }
});