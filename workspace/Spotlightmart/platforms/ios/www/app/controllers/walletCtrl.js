SpotlightmartApp.controller('walletCtrl', function ($scope, CordovaService, $cordovaFile, $location, $rootScope, $uibModal) {
    CordovaService.ready.then(function () {
        $scope.oWallet;
        init();
        
        function init() {
            if ($scope.oWallet == null)
            {
                $cordovaFile.readAsText(cordova.file.dataDirectory, USER_CARD_FILE).then(
                    function (payload)
                    {
                        console.log("Successfully read card data : %o", payload);
                        $scope.oWallet = JSON.parse(payload);
                    },
                    function (error)
                    {
                        console.log("Failed to read card data with error : %o", error);
                        console.log("Default to empty card list");
                        $scope.oWallet = [];
                    }
                )
            }
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

        function DeleteCardFromWallet(oldCard) {
            angular.forEach($scope.oWallet, function (index, oCard)
            {
                if (oCard.cardno == oldCard.cardno)
                {
                    console.log("Removing " + index + " credit card : %o", oCard);
                    $scope.oWallet.splice(index);
                }
            });
        }

        function SaveCardToFile() {
            $cordovaFile.writeFile(cordova.file.dataDirectory, USER_CARD_FILE, JSON.stringify($scope.oWallet), true).then(
                function (response)
                {
                    console.log("Card saved successfully");
                },
                function (error)
                {
                    console.log("Card save failed with error : %o", error);
                    alert("Card save failed with error, please try again");
                }
            )
        }
        $scope.EditCard = function (card)
        {
            var mdlCard = $uibModal.open({
                animation: true,
                templateUrl: 'app/modals/card.html',
                controller: 'mdlCardCtrl',
                backdrop: 'static',
                resolve: {
                    card: function () {
                        return card;
                    },
                    title: function () {
                        return "Edit Card"
                    }
                }
            });

            mdlCard.result.then(function(card) {
                console.log("Received card object from modal : %o", card);
                MergeCardToWallet(card);
                SaveCardToFile();
            });
        }

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
                SaveCardToFile();
            });
        }

        $scope.ShowDeleteButton = function(card)
        {
            card.delete = true;
        }

        $scope.DeleteCard = function(card)
        {
            DeleteCardFromWallet(card);
            SaveCardToFile();
        }
    });
});