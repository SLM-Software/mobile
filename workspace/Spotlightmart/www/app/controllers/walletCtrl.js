SpotlightmartApp.controller('walletCtrl', function ($scope, CordovaService, $cordovaFile, $location, $rootScope, $uibModal) {
    CordovaService.ready.then(function () {
        $scope.oWallet;
        $scope.arrDelete = [];
        init();
        
        function init() {
            if ($scope.oWallet == null)
            {
                $cordovaFile.readAsText(cordova.file.dataDirectory, USER_CARD_FILE).then(
                    function (payload)
                    {
                        $scope.oWallet = JSON.parse(payload);
                        console.log("Successfully init card data : %o", $scope.oWallet);

                        for (var i=0; i < $scope.oWallet.length; i++)
                        {
                            var oCard = $scope.oWallet[i];
                            console.log("Initializing delete object for : %o", oCard);
                            $scope.arrDelete.push({ "cardno" : oCard.cardno, "delete" : false});
                        }
                        console.log("Successfully init arrDelete : %o", $scope.arrDelete);
                    },
                    function (error)
                    {
                        console.log("Failed to read card data with error : %o", error);
                        console.log("Default to empty card list");
                        $scope.oWallet = [];
                        $scope.arrDelete = [];
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

        $scope.ToggleDeleteButton = function(card, status)
        {
            console.log("Toggling " + card.cardno +" delete status to " + status + "...");
            for (var i=0; i < $scope.oWallet.length; i++)
            {
                var oDelete = $scope.arrDelete[i];
                if (oDelete.cardno == card.cardno)
                {
                    oDelete.delete = status;
                    console.log("Setting delete to " + oDelete.delete + " for " + oDelete.cardno);
                }
            }
        }

        $scope.ShowDeleteButton = function(card)
        {
            console.log("Checking " + card.cardno + " for delete status...");
            for (var i=0; i < $scope.oWallet.length; i++)
            {
                var oDelete = $scope.arrDelete[i];
                if (oDelete.cardno == card.cardno)
                {
                    console.log("Delete status for " + card.cardno + " : " + oDelete.delete);
                    return oDelete.delete;
                }
            }
        }

        $scope.DeleteCard = function(card)
        {
            DeleteCardFromWallet(card);
            SaveCardToFile();
        }
    });
});