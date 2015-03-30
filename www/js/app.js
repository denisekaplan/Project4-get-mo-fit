var dailysteps;
var stepPoints = 0;


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


.controller('AppCtrl', function($scope, $cordovaHealthKit, $ionicPopup, $timeout) {

  $scope.locationRefresh = function() {
		location.reload();
    $scope.messages();
		$scope.$broadcast('scroll.refreshComplete');
  };
  $scope.stepRefresh = function() {
    $scope.querySampleType();
		$scope.$broadcast('scroll.refreshComplete');
  };
////////////// MESSAGES ///////////////////////
  var p = localStorage.getItem('p');
  var pInt = parseInt(p);

  var messages = {
     mean: {
       fatty: ["Let's go, FattyBoomBaLattie!", "Do you seriously want me to have a coronary?", "Does this fat make me look fat? Yeah? Then get to the gym!", "C'mon, my knees are crumbling under my fatness!"],
       meh: ["Don't even think of slacking off just because I've dropped a few!", "I have but one wish and that is to see my privates again.", "Get a move on - my chub rub is about to start a fire!", "Driving by the gym doesn't count as working out!", "Keep it moving, thunder thighs! We're finally making progress!"],
       healthy: ["I look hot, but I could be hotter!", "I'm much less disgusting than I used to be!", "Keep it going - I'm almost back in my short shorts!"],
       fit: ["I'd totally swipe right for me!", "I just bounced a quarter off my tush!", "Do you want a beer? Because I've got a 6 pack!", "Is that the sound of clanging steel? Nah, it's just me touching my abs!"]},
     nice: {
       fatty: ["Let’s get moving!", "Help Mo get fit!", "I’m husky now, but with your help I’m getting in shape!", "I need you to get me in shape!"],
       meh: ["I can see my feet!", "I didn't have to drop it like it's hot to zip my pants this morning!", "I took the stairs today... and didn't have to call 911 after!", "I took my shirt off at the beach! I had another one on underneath, but it's a start!"],
       healthy: ["I'm looking good!", "I don't get winded saying long sentences anymore!", "My life expentancy has increased by 5 years!", "Thanks to you and healthier food choices, I look great!"],
       fit: ["Check me out!", "I'm hot!", "How you doin'?", "Welcome to the gun show!"]}
   };

   $scope.runNiceMessages = function(){

       if(pInt < 25){
         setInterval(function(){
           var rNum = Math.floor(Math.random()*3);
           $ionicPopup.alert({title:"Message from Mo...", template: messages.nice.fatty[rNum] }); }, 60000);

         }
       else if(pInt > 24 && pInt < 50){
         setInterval(function(){
           var rNum = Math.floor(Math.random()*3);
           $ionicPopup.alert({title:"Message from Mo...", template: messages.nice.meh[rNum] }); }, 60000);
       }
       else if(pInt > 49 && pInt < 75){
         setInterval(function(){
           var rNum = Math.floor(Math.random()*3);
           $ionicPopup.alert({title:"Message from Mo...", template: messages.nice.healthy[rNum] }); }, 60000);
       }
       else {
         setInterval(function(){
           var rNum = Math.floor(Math.random()*3);
           $ionicPopup.alert({title:"Message from Mo...", template: messages.nice.fit[rNum] }); }, 60000);
       }
     };

     $scope.runMeanMessages = function(){

         if(pInt < 25){
           setInterval(function(){
             var rNum = Math.floor(Math.random()*3);
             $ionicPopup.alert({title:"Message from Mo...", template: messages.mean.fatty[rNum] }); }, 60000);
           }
         else if(pInt > 24 && pInt < 50){
           setInterval(function(){
             var rNum = Math.floor(Math.random()*3);
             $ionicPopup.alert({title:"Message from Mo...", template: messages.mean.meh[rNum] }); }, 60000);
         }
         else if(pInt > 49 && pInt < 75){
           setInterval(function(){
             var rNum = Math.floor(Math.random()*3);
             $ionicPopup.alert({title:"Message from Mo...", template: messages.mean.healthy[rNum] }); }, 60000);
         }
         else {
           setInterval(function(){
             var rNum = Math.floor(Math.random()*3);
             $ionicPopup.alert({title:"Message from Mo...", template: messages.mean.fit[rNum] }); }, 60000);
         }
     };


 $scope.messages = function(){
       var attitude = localStorage.getItem('moattitude');
         console.log("mo's attitude: " + attitude);

       if(attitude == "Mean Mo"){
         $scope.runMeanMessages();
       }
       else {
         $scope.runNiceMessages();
       };
     };

     $scope.messages();


/////////////////////////////// END MESSAGES /////////////////////////


// THIS GETS THE STEPS FROM HEALTHKIT
    $scope.querySampleType = function() {
    $cordovaHealthKit.querySampleType(
        {
          'startDate': new Date(new Date().getTime() - 1*24*60*60*1000), // 24hrs ago
          'endDate': new Date(), // now
          'sampleType': 'HKQuantityTypeIdentifierStepCount', // anything in HealthKit/HKTypeIdentifiers.h
          'unit' : 'count' // make sure this is compatible with the sampleType
        }
    ).then(function(s){
      // alert("Steps: " + JSON.stringify(s));

      // alert("length: " + s.length);
      var dailysteps = 0;
      for(i = 0; i < s.length; i++){
        dailysteps = s[i].quantity + dailysteps;
      }
      // alert("dailysteps: " + dailysteps);
      $scope.dailysteps = dailysteps;


      $scope.steps = s;
      stepPoints = Math.round((dailysteps / 20));
      // alert("StepPoints: " + stepPoints);

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
