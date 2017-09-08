SpotlightmartApp.controller('walletCtrl', function ($scope, CordovaService, $cordovaFile, $location, $rootScope, $uibModal) {
    CordovaService.ready.then(function () {
        $scope.oWallet;
        init();
        
        function init() {
        }

        $scope.EditCard = function (card)
        {}

        $scope.AddCard = function()
        {
            var mdlCard = $uibModal.open({
                animation: true,
                templateUrl: 'app/modals/card.html',
                controller: 'mdlCardCtrl',
                backdrop: 'static',
                resolve: {
                    card: function () {
                        return null;
                    },
                    title: function () {
                        return "Add New Card"
                    }
                }
            });

            mdlCard.result.then(function(card) {
            });

        }
    });
});