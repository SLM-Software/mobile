SpotlightmartApp.controller('walletCtrl', function ($scope, CordovaService, $cordovaFile, $location, $rootScope, $uibModal) {
    CordovaService.ready.then(function () {
        $scope.oWallet;
        init();
        
        function init() {
            $scope.oWallet = [];
        }

        function MergeCardToWallet(newCard) {
            var blnMerged = false;
            angular.forEach($scope.oWallet, function (index, oCard)
            {
                if (blnMerged == false)
                {
                    if (newCard.cardno == oCard.cardno)
                    {
                        $scope.oWallet[index] = newCard;
                        blnMerged = true;
                    }
                }
            });

            if (blnMerged == false)
            {
                $scope.oWallet.push(newCard);
            }
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
                console.log("Received card object from modal : %o", card);
                MergeCardToWallet(card);
            });

        }

        $scope.DeleteCard = function(card)
        {
            alert("You sure you want to delete?");
        }
    });
});