SpotlightmartApp.controller('homeCtrl', function ($scope, CordovaService, $location, $rootScope) {
    CordovaService.ready.then(function () {
        // generate 40 cards
        $scope.currentIndex = 0;
        $scope.name = "John Doe";
        $scope.slides = [
            { quot : '$1.00 Off Coke', img_url : '/img/Coke_20oz.png', msg : 'Buy 20oz Coke Get $1.00 Off' },
            { quot : 'Free Cheerios', img_url : '/img/cheerios_en.png', msg : 'Buy 1 Get 1 Free' }
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
});