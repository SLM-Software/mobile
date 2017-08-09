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


var SpotlightmartApp = angular.module('SpotlightmartApp', ['fsCordova', 'ngRoute','ui.bootstrap','ngAnimate','ngTouch', 'ngStorage']);

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
        .otherwise({
            redirectTo: '/Home/'
        });
});

SpotlightmartApp.controller('indexCtrl', function ($scope, CordovaService, $location, $rootScope) {
});
