SpotlightmartApp.controller('tabbarCtrl', function ($scope, CordovaService, $location, $rootScope, $window) {
    CordovaService.ready.then(function () {

        $scope.selectedTab = '';

        init();

        // Default Constructor
        function init()
        {
            console.log("Current path : " + $location.path());
            if ($window.location.href.indexOf("Home") > -1)
                $scope.selectedTab = "Home";
            else if ($window.location.href.indexOf("Search") > -1)
                $scope.selectedTab = "Search";
            else if ($window.location.href.indexOf("Cart") > -1)
                $scope.selectedTab = "Cart";
            else if ($location.path().indexOf("Settings") > -1)
                $scope.selectedTab = "Settings";
            
            console.log("Current selected tab : " + $scope.selectedTab);
        }

        $scope.changeTab = function (tabname)
        {
            if (tabname == 'Home')
            {
                $scope.selectedTab = 'Home';
                $location.path("/Home");
            }
            else if (tabname == 'Cart')
            {
                location.href="/index.html#/Cart";                
            }
            else if (tabname == 'Search')
            {
                $scope.selectedTab = 'Home';
                $location.path("/Search");
            }
            else if (tabname == 'Settings')
            {
                $scope.selectedTab = 'Settings';
                $location.path("/Settings");
            }
            console.log("Current selected tab : " + $scope.selectedTab);
        }
        
        $scope.isActive = function(viewName)
        {
            if ($location.path().indexOf(viewName) > -1)
                return 'active';
            else
                return '';
        }
    });
});