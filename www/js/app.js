// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    $cordovaHealthKit.isAvailable().then(function(yes) {
    // HK is available
    var permissions = ['HKQuantityTypeIdentifierHeight', 'HKQuantityTypeIdentifierStepCount'];

    $cordovaHealthKit.requestAuthorization(
        permissions, // Read permission
        permissions // Write permission
    ).then(function(success) {
        // store that you have permissions
    }, function(err) {
        // handle error
    });

}, function(no) {
    // No HK available
})

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.controller('AppCtrl', function($scope, $cordovaHealthKit) {
    $scope.body = {
        height: ''
    };

    $scope.saveHeight = function() {
        $cordovaHealthKit.saveHeight($scope.body.height, 'cm').then(function(v) {
        }, function(err) {
            console.log(err);
        });
    };

    $scope.getHeight = function() {
        $cordovaHealthKit.readHeight('cm').then(function(v) {
            alert('Your height: ' + v.value + " " + v.unit);
        }, function(err) {
            console.log(err);
        });
    };

    $scope.querySampleType = function() {
    $cordovaHealthKit.querySampleType(
        {
          'startDate': new Date(new Date().getTime() - 3*24*60*60*1000), // three days ago
          'endDate': new Date(), // now
          'sampleType': 'HKQuantityTypeIdentifierStepCount', // anything in HealthKit/HKTypeIdentifiers.h
          'unit' : 'count' // make sure this is compatible with the sampleType
        }
    ).then(function(s){
      // alert("Steps: " + s[0].quantity);
      $scope.steps = s;
    })
  };



})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:
  // mo screen
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.workouts', {
    url: '/workouts',
    views: {
      'tab-workouts': {
        templateUrl: 'templates/tab-workouts.html',
        controller: 'WorkoutsCtrl'
      }
    }
  })

  .state('tab.activities', {
      url: '/activities',
      views: {
        'tab-activities': {
          templateUrl: 'templates/tab-activities.html',
          controller: 'WorkoutsCtrl'
        }
      }
    })

    .state('tab.steps', {
        url: '/steps',
        views: {
          'tab-steps': {
            templateUrl: 'templates/tab-steps.html',
            controller: 'AppCtrl'
          }
        }
      })



    .state('tab.activity-detail', {
      url: '/activities/:activityId',
      views: {
        'tab-activities': {
          templateUrl: 'templates/activity-detail.html',
          controller: 'ActivityDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
