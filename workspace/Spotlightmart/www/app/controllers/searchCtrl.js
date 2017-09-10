SpotlightmartApp.controller('searchCtrl', function ($scope, CordovaService, $location, $rootScope) {
    CordovaService.ready.then(function () {
        $scope.arrCategories = PRODUCT_CATGORIES;
        $scope.selectedCategory = "";

        init();
        
        function init() {
            console.log("Loading product categories : %o", $scope.arrCategories);
        }

        $scope.SearchInCategory = function(selectedCategory)
        {}

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
                    alert("Item selected : " + item);
                },
                function()
                {
                    alert("You have cancelled");
                }
            );
        }
    });
});