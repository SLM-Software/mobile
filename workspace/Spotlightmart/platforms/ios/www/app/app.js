angular.module('fsCordova', [])
.service('CordovaService', ['$document', '$q',
  function ($document, $q) {

      var d = $q.defer(),
          resolved = false;

      var self = this;
      this.ready = d.promise;

      document.addEventListener('deviceready', function () {
          resolved = true;
          d.resolve(window.cordova);
      });

      document.addEventListener("backbutton", function() {
          navigator.notification.confirm(
            'Do you really want to exit this app?',
            function (btnIndex) {
                if (btnIndex==1) // OK
                    navigator.app.exitApp();
            },
            "Confirm exit",
            ['OK', 'Cancel']
          );
      }, false);
      
      // Check to make sure we didn't miss the 
      // event (just in case)
      setTimeout(function () {
          if (!resolved) {
              if (window.cordova) d.resolve(window.cordova);
          }
      }, 3000);
  }]);


var SpotlightmartApp = angular.module('SpotlightmartApp', ['fsCordova', 'ngRoute','ui.bootstrap','ngAnimate','ngTouch', 'ngStorage', 'ngCordova.plugins.file']);

SpotlightmartApp.filter('substring', function() {
    return function(str, start, end) {
        return str.substring(start, end);
    }
});
SpotlightmartApp.filter('roundto5', function() {
    return function(num) {
        return 5 * Math.round(num/5);
    }
});
SpotlightmartApp.filter('replace', function() {
    return function(oldstr, newstr) {
        return oldstr.replace(/oldstr/g, newstr);
    }
});

SpotlightmartApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/Home/', {
            templateUrl: 'app/views/home.html',
            controller: 'homeCtrl'
        })
        .when('/Settings/', {
            templateUrl: 'app/views/settings.html',
            controller: 'settingsCtrl'
        })
        .when('/Settings/Personal/', {
            templateUrl: 'app/views/personal.html',
            controller: 'personalCtrl'
        })
        .when('/Settings/Wallet/', {
            templateUrl: 'app/views/wallet.html',
            controller: 'walletCtrl'
        })
        .when('/Search', {
            templateUrl: 'app/views/search.html',
            controller: 'searchCtrl'
        })
        .otherwise({
            redirectTo: '/Home/'
        });
});

SpotlightmartApp.controller('indexCtrl', function ($scope, CordovaService, $location, $rootScope, $uibModal) {
    CordovaService.ready.then(function () {
        $scope.Login = function () {
            var mdlLogin = $uibModal.open({
                                animation: true,
                                templateUrl: 'app/modals/login.html',
                                controller: 'mdlLoginCtrl',
                                backdrop: 'static'
                            });
            
            mdlLogin.result.then(function(user) {
            });
        };
        
        $scope.isLeftNevButtonHidden = function() {
            console.log("Current path : " + $location.path());
            if ($location.path() == '/Settings/Personal/')
            {
                $("#btnLeftNav").removeClass("hidden");
                return false;                    
            }
            else if ($location.path() == '/Settings/Wallet/')
            {
                $("#btnLeftNav").removeClass("hidden");
                return false;
            }
            else
                return true;
        }
        
        $scope.leftNavButtonClicked = function() {
            if ($location.path() == '/Settings/Personal/')
                $location.path('/Settings');
            else if ($location.path() == '/Settings/Wallet/')
                $location.path('/Settings');
        }
    });
});
