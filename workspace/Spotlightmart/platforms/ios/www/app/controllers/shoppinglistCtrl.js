SpotlightmartApp.controller('shoppinglistCtrl', function ($scope, CordovaService, $cordovaFile, $location, $rootScope, $uibModal) {
    CordovaService.ready.then(function () {
        $scope.shoppingList = [];
        init();

        function init() {
            $scope.shoppingList = [ { upc : "1", name : "Coke 20oz original flavor", location : "Aisle 4", price : "$3.99"},
                { upc : "2", name : "Honey Cheerios", location : "Aisle 1", price : "$2.99" } ];
        }

        $scope.OpenItemDetail = function(upc)
        {
            console.log("Viewing upc : " + upc);
            var mdlItemDetail = $uibModal.open({
                animation: true,
                templateUrl: 'app/modals/itemdetail.html',
                controller: 'mdlItemDetailCtrl',
                backdrop: 'static',
                resolve: {
                    upc : function () {
                        return upc;
                    },
                    blnShowNavigation : function () {
                        return true;
                    },
                    blnShowAddShoppingList : function () {
                        return false;
                    }
                }
            });

            mdlItemDetail.result.then(function() {
            });

        }

    });
});