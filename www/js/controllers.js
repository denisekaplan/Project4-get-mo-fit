var totalworkouts;

angular.module('starter.controllers', [])


.controller('DashCtrl', function($scope, $cordovaHealthKit) {

	$scope.progress = document.getElementById("progress");

	$scope.progress.onclick = function(){
		console.log("Progress Bar Clicked!");
		this.style.width = "50%";
	}

	$cordovaHealthKit.requestAuthorization(
	    [
	      'HKCharacteristicTypeIdentifierDateOfBirth',
	      'HKQuantityTypeIdentifierActiveEnergyBurned',
	      'HKQuantityTypeIdentifierHeight'
	    ],
	    [
	      'HKQuantityTypeIdentifierActiveEnergyBurned',
	      'HKQuantityTypeIdentifierHeight',
	      'HKQuantityTypeIdentifierDistanceCycling'
	    ]
		).then(function(success) {
		    $scope.granted = true;
		  }, function(err) {
		    $scope.granted = false;
	});

	$cordovaHealthKit.readDateOfBirth().then(function(dob) {
 		 console.log('Date of Birth:');
 		 console.log(dob);
	}, function(err) {
	});


})

.controller('ActivitiesCtrl', function($scope) {


})

.controller('WorkoutsCtrl', function($scope){
  // $scope.date = '';
  // $scope.duration = '';
  // $scope.activity = '';
  // if(totalworkouts != null){
  // 	return totalworkouts
  // 	console.log(totalworkouts)
  // } else {
  // 	var totalworkouts = ["hahaha motherfuckers"];
  // }

  if(localStorage.getItem('totalworkoutarray') != null){
  	totalworkouts = JSON.parse(localStorage.getItem('totalworkoutarray'));
  } else {
  	totalworkouts = [];
  }

  $scope.saveWorkout = function(date,duration,activity){

// single workout
  	var workout = {
  		date: date,
  		duration: parseInt(duration),
  		activity: activity
  	};
  	console.log(workout);

  	console.log(totalworkouts);
  	totalworkouts.push(workout);

  	// To check if the newest workout is pushing to total workouts array.
  	console.log(totalworkouts + "push");
  	var totalworkoutsstring = JSON.stringify(totalworkouts);

  	localStorage.setItem('totalworkoutarray', totalworkoutsstring);
  }

	$scope.logs = totalworkouts;

})

// .controller('ActivityDetailCtrl', function($scope, $stateParams, Activities) {
//   // $scope.activity = Activities.get($stateParams.activityId);
// })

.controller('AccountCtrl', function($scope) {

})

.controller('FormController', function($scope){
	$scope.userName = '';
	$scope.userEmail = '';
	$scope.FitnessGoal = '';
	$scope.gender = '';
	$scope.moattitude = '';

	$scope.saveData = function(x,y,z,a,b){

	if(x != ""){
		window.localStorage.setItem("userName", x);
	}
	if(y != ""){
		window.localStorage.setItem("userEmail", y);
	}
	if(z != ""){
		window.localStorage.setItem("FitnessGoal", z);
	}
	if(a != ""){
		window.localStorage.setItem("gender", a);
	}
	if(b != ""){
		window.localStorage.setItem("moattitude", b);
	}

	}
	$scope.loadData = function(){
		console.log(window.localStorage.getItem("userName"));
		console.log(window.localStorage.getItem("userEmail"));
		console.log(window.localStorage.getItem("FitnessGoal"));
		console.log(window.localStorage.getItem("gender"));
		console.log(window.localStorage.getItem("moattitude"));
	}

});
