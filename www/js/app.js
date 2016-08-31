var domain = 'http://nahar.clu.pw/api/';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'nahar' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'nahar.controllers' is found in controllers.js
angular.module('nahar', ['ionic', 'ngCordova', 'nahar.controllers', 'nahar.services'])

.run(function($ionicPlatform, $cordovaStatusbar) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        try {
             $cordovaStatusbar.styleHex('#729a36'); 
        } catch(e) {
            // statements
            console.log(e);
        }
            
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('app.landingPage', {
            url: '/landing-page',
            views: {
                'menuContent': {
                    templateUrl: 'templates/landing-page.html'
                }
            }
        })
        .state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/login.html',
                    controller: 'AuthCtrl'
                }
            }
        })
        .state('app.signup', {
            url: '/signup',
            views: {
                'menuContent': {
                    templateUrl: 'templates/signup.html',
                    controller: 'AuthCtrl'
                }
            }
        })
        .state('app.guestVerification', {
            url: '/guest-verification',
            views: {
                'menuContent': {
                    templateUrl: 'templates/guest-verification.html',
                    controller: 'AuthCtrl'
                }
            }
        })
        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html'
                }
            }
        })
        // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/landing-page');
});
