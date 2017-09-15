SpotlightmartApp.controller('searchCtrl', function ($scope, CordovaService, $location, $rootScope) {
    CordovaService.ready.then(function () {
        $scope.arrCategories = PRODUCT_CATGORIES;
        $scope.selectedCategory = "";
        $scope.searchResult;

        init();
        
        function init() {
            console.log("Loading product categories : %o", $scope.arrCategories);
            $scope.selectedCategory = "Categories";
        }

        $scope.btnSearchClick = function(selectedCategory)
        {
            $scope.searchResult = [ { name : "Coke 20oz original flavor", location : "Aisle 4", price : "$3.99"},
                { name : "Honey Cheerios", location : "Aisle 1", price : "$2.99" } ];
        }

        $scope.btnCategoryClick = function()
        {
            var dropdownConfig = {
                title : "Categories",
                items : PRODUCT_CATGORIES,
                doneButtonLabel : "Done",
                cancelButtonLabel : "Cancel"
            };

            window.plugins.listpicker.showPicker(
                dropdownConfig,
                function(item)
                {
                    $scope.selectedCategory = item;
                    $scope.$apply();
                },
                function()
                {
                    alert("You have cancelled");
                }
            );
        }
    });
});