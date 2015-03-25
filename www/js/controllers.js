var totalworkouts;

// var duration_sum = 0;

var totalpoints = 0;

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

	console.log("Totalpoints in localstorage: " + localStorage.getItem('totalpoints'));

  $scope.saveWorkout = function(date,duration,activity){

// single workout
  	var workout = {
  		date: date,
  		duration: parseInt(duration),
  		activity: activity
  	};

  	console.log("Now I'm logging the workout " + workout);

// adding points function
		var addpoints = function(){

			//get the old points from local storage
			oldpoints = localStorage.getItem('totalpoints');
			console.log("oldpoints: " + oldpoints);

			// get the new points which is equal to the workout duration
			newpoints = workout.duration;
			console.log("newpoints: " + newpoints);

			// if the old points is null and is less than 100, add old and new points
			if(oldpoints != null && parseInt(oldpoints) < 100){
			totalpoints = parseInt(oldpoints) + parseInt(newpoints);
				// if the total points is over 100, set total points to 100
				if(parseInt(totalpoints) > 100){
					totalpoints = 100;
				}
		}
				// if the old points == 100, keep total at 100
			else if(parseInt(oldpoints) == 100){
				totalpoints = 100;
			}
			 // if there are no old points, set totalpoints equal to the new points
			else {
			totalpoints = parseInt(newpoints);
		}
			console.log("totalpoints: " + totalpoints);

			// set the new total points in local storage
			localStorage.setItem('totalpoints', totalpoints);
		};

		// run the function
		addpoints();




  	totalworkouts.push(workout);
		console.log("This is logging the totalworkouts array with the new object " + totalworkouts);

  	// To check if the newest workout is pushing to total workouts array.
  	console.log(totalworkouts + "push");
  	var totalworkoutsstring = JSON.stringify(totalworkouts);

  	localStorage.setItem('totalworkoutarray', totalworkoutsstring);
  }

	$scope.logs = totalworkouts;


	// $scope.calculateSum = function() {
	// 	for (i = 0; i < totalworkouts.length; i++) {
	// 		duration_sum = duration_sum + totalworkouts[i].duration;
	// 		console.log("This is the new duration_sum " + duration_sum);
	// 	}
	// }

	// $scope.calculateSum(totalworkouts);

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

	$scope.showData = function() {
		$scope.name = localStorage.getItem("userName");
		$scope.email_address = localStorage.getItem("userEmail");
		$scope.fit_goal = localStorage.getItem("FitnessGoal");
	}

	$scope.showData();

});
