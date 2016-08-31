angular.module('nahar.services', [])
.factory('APIFactory', ['$http', '$httpParamSerializer', function ($http, $httpParamSerializer) {
    var api = { 
          getBuildings: function () {
                return $http.get(domain + "masters/society/");
            },
          getFlats: function (id) {
                return $http.get(domain + "masters/society/"+id+"/flats");
            },
            authUser: function (data) {
                var req = { method: 'POST', url: domain + 'login', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, data: jQuery.param({ 'data': data }) };
                return $http(req);
            },
            checkFirstUser: function (data) {
                var req = { method: 'POST', url: domain + 'users/checkfirstuser/', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, data: $httpParamSerializer(data)};
                return $http(req);
            }
           
    };
    return api;
}])
.factory('Loader', ['$ionicLoading', '$timeout', '$cordovaToast', function($ionicLoading, $timeout, $cordovaToast) {
        var LOADERAPI = {
            show: function(text) {
                if (text) {
                    $ionicLoading.show({
                        template: text
                    });
                } else {
                    $ionicLoading.show();
                }
            },
            hide: function() {
                $ionicLoading.hide();
            },
            toggleLoadingWithMessage: function(text, timeout) {
                var self = this;
                self.show(text);
                $timeout(function() {
                    self.hide();
                }, timeout || 3000);
            },

            toast: function (msg) {   
                var isAndroid = ionic.Platform.isAndroid();
                var isIOS = ionic.Platform.isIOS();
                if (isAndroid || isIOS) {
                 $cordovaToast.show(msg, 'short', 'center').then(function(success) {});    
                }
                else {
                    console.info(msg);
                }
            }
        };
        return LOADERAPI;
}])
.factory('LSFactory', [function() {

        var LSAPI = {
            clear: function() {
                return localStorage.clear();
            },
            get: function(key) {
                return JSON.parse(localStorage.getItem(key));
            },
            set: function(key, data) {
                return localStorage.setItem(key, JSON.stringify(data));
            },
            setArray: function(key, data) {
                return localStorage.setItem(key, JSON.stringify([data]));
            },
            delete: function(key) {
                return localStorage.removeItem(key);
            },
            getAll: function() {
            }
        };
        return LSAPI;
}])
.factory('CommonFactory', ['$cordovaInAppBrowser', function($cordovaInAppBrowser) {

        var commonFactory = {
            inAppLink: function(link) { 
            var options = {location: 'yes',clearcache: 'yes',toolbar: 'no',closebuttoncaption: 'DONE?' };
                return $cordovaInAppBrowser.open(link, '_blank', options);
            }
            }  
        return commonFactory;
}])