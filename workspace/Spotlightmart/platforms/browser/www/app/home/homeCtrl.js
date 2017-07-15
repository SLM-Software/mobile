SpotlightmartApp.controller('homeCtrl', function ($scope, CordovaService, $location, $rootScope) {
    // generate 40 cards
    $scope.currentIndex = 0;
    $scope.name = "John Doe";
    $scope.slides = [
        { quot : 'This is card #1'},
        { quot : 'This is card #2'},
        { quot : 'This is card #3'},
        { quot : 'This is card #4'}
    ];

    $scope.prevSlide = function () {
        $scope.direction = 'left';
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.direction = 'right';
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };    
    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };
});