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

.controller('ActivitiesCtrl', function($scope, Activities) {
  $scope.activities = Activities.all();
  $scope.remove = function(activity) {
    Activities.remove(activity);
  }
})

.controller('WorkoutsCtrl', function($scope){
  $scope.workouts = {};
})

.controller('ActivityDetailCtrl', function($scope, $stateParams, Activities) {
  $scope.activity = Activities.get($stateParams.activityId);
})

.controller('AccountCtrl', function($scope) {

})

.controller('FormController', function($scope){
	$scope.userName = '';
	$scope.userEmail = '';
	$scope.FitnessGoal = '';

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

	}
	$scope.loadData = function(){
		console.log(window.localStorage.getItem("userName"));
		console.log(window.localStorage.getItem("userEmail"));
		console.log(window.localStorage.getItem("FitnessGoal"));
	}

});

