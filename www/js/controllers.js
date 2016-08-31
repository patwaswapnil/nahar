angular.module('nahar.controllers', [])

.controller('AppCtrl', function($state, $scope, $ionicModal, $timeout, LSFactory) {

    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.redirectAuthentication = function(userType) {
        if (userType == 'resident') {
            $state.go('app.login');
        } else {
            $state.go('app.guestVerification');
        }
    };

})

.controller('AuthCtrl', function($scope, Loader, $timeout, $state, $ionicHistory, $ionicSideMenuDelegate, $cordovaDatePicker, APIFactory, $ionicPopup, $cordovaDatePicker, LSFactory) {
    $ionicSideMenuDelegate.canDragContent(false)
    $scope.otpSent = false;
    $scope.generalInfo = true;
    $scope.primaryUser = true;
    $scope.tenant = false;


    function getBuildings() {
        Loader.show();
        APIFactory.getBuildings().then(function(response) {
            $scope.naharBuildings = response.data;
            Loader.hide();
        }, function() {
            Loader.toast('Oops! something went wrong');
            Loader.hide(); 
        })
    };
    getBuildings();
    $scope.getFlats = function(buildingId) {
        Loader.show();
        APIFactory.getFlats(buildingId).then(function(response) {
            $scope.flats = response.data;
            Loader.hide(); 
        }, function() {
            Loader.toast('Oops! something went wrong');
            Loader.hide(); 
        });
    };
    $scope.checkPrimaryUser = function(socityId, flatId) {
       
        // var data = {society_id: socityId, flat_id: flatId};
        // APIFactory.checkFirstUser(data).then(function(response) {
        //     $scope.primaryUser = (response.data.firstUser);
        //     Loader.hide(); 
        // }, function() {
        //     Loader.toast('Oops! something went wrong');
        //     Loader.hide(); 
        // });
        var users = LSFactory.get('users');
        console.log(socityId + ' '+ flatId);
         angular.forEach(users, function(element, index) { 
             if((socityId == element.society_id) && (flatId == element.flat_id)) {
                $scope.primaryUser = false;
                console.log('false');
             } else {
                $scope.primaryUser = true;

             }
     

        }); 

    };
    $scope.varifyGuestUser = function(data) {
        Loader.show('Sending One Time Password...');
        $timeout(function() {
            $scope.otpSent = true;
            Loader.hide();
            Loader.toast('Please enter OTP to proceed');
        }, 2000);
    };
    $scope.varityGuestMobile = function(otp) {
        Loader.show('Verifying mobile number...');
        $timeout(function() {
            Loader.hide();
            Loader.toast('Verified mobile number successfully');
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $ionicHistory.clearHistory()
            $state.go('app.home');
        }, 2000);
    };
 
    $scope.registerSteps = function(data) {
        $scope.generalInfo = false; 
    };
    $scope.registerResident = function (data) {
        console.log(data)
        Loader.show('Registering resident...')
        if (!LSFactory.get('users')) {
            LSFactory.setArray('users', data);
        }
        else {
            var users = LSFactory.get('users'); 
            users.push(data);
            LSFactory.set('users', users);
        }
        $timeout(function () {
            Loader.toggleLoadingWithMessage('Registered successfully!');
            $state.go('app.login');
        })
    };
    $scope.authResident = function (data) {
        console.log(data)
          Loader.show('Verifying credential...');
    
        var users = LSFactory.get('users');
        angular.forEach(users, function(element, index) {

             if((data.username == element.mobile) && (data.password == element.password)) {
            $timeout(function() { 
                Loader.toggleLoadingWithMessage('Verification successful');
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $ionicHistory.clearHistory()
                $state.go('app.home');
            }, 2000);
             }
             else {
                 $timeout(function() { 
                Loader.toggleLoadingWithMessage('Invalid username or password'); 
            }, 2000); 
             }
        }); 
    }

       var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    minDate: new Date() - 10000,
    allowOldDates: true,
    allowFutureDates: false,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  };
    $scope.selectDoB = function () {
      $cordovaDatePicker.show(options).then(function(date){
        $scope.dob = date;
    });
    }
    $scope.contractDate = function () {
      $cordovaDatePicker.show(options).then(function(date){
        $scope.contractEndDate = date;
    });
    };
    $scope.anniversary = function () {
      $cordovaDatePicker.show(options).then(function(date){
        $scope.anniversaryDate = date;
    });
    };
    $scope.checkTypeResident = function (type) { 
        if(type == 2) {
          $scope.tenant = true;
        } else {
          $scope.tenant = false; 
        }
    }
    $scope.resetPwd = function() {
        $scope.data = {}
            // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="number" ng-model="data.mobile" placeholder="Enter you mobile number" class="padding">',
            title: 'Enter your mobile number',
            subTitle: 'You will get OTP to reset password',
            scope: $scope,
            buttons: [{
                text: 'Cancel',
                type: 'fz12'
            }, {
                text: 'Submit',
                type: 'button-balanced nahar-primary nahar-bar fz12',
                onTap: function(e) {
                    if (!$scope.data.email) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                    } else {
                        return $scope.data;
                    }
                }
            }, ]
        });
        myPopup.then(function(data) {
            if (!data) {
                return false;
            }
            Loader.show();
            // APIFactory.resetPwd(data).then(function(response) {
            //     if (response.data.error == 'success') {
            //         Loader.toggleLoadingWithMessage('Your password reset link has been sent to your email Id');
            //     } else {
            //         Loader.toggleLoadingWithMessage('This Email Id is not registered');
            //     }
            // }, function(error) {
            //     console.error(error);
            //     Loader.toggleLoadingWithMessage('Somwthing went wrong. Please try later');
            // })
        });
    };

})

.controller('PlaylistCtrl', function($scope, $stateParams) {});
