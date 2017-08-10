SpotlightmartApp.controller('tabbarCtrl', function ($scope, CordovaService, $location, $rootScope, $window) {

    $scope.selectedTab = '';
    
    init();
    
    // Default Constructor
    function init()
    {
        if ($window.location.href.indexOf("Home") > -1)
            $scope.selectedTab = "Home";
        else if ($window.location.href.indexOf("Search") > -1)
            $scope.selectedTab = "Search";
        else if ($window.location.href.indexOf("Cart") > -1)
            $scope.selectedTab = "Cart";
        else if ($window.location.href.indexOf("Settings") > -1)
            $scope.selectedTab = "Settings";
        
        console.log("Current selected tab : " + $scope.selectedTab);
    }
    
    $scope.changeTab = function (tabname)
    {
        if (tabname == 'Home')
        {
            location.href="/index.html#/Home";                
        }
        else if (tabname == 'Cart')
        {
            location.href="/index.html#/Cart";                
        }
        else if (tabname == 'Search')
        {
            location.href="/index.html#/Search";            
        }
        else if (tabname == 'Settings')
        {
            location.href="/index.html#/Settings";
        }
    }
});