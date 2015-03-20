angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

	$scope.progress = document.getElementById("progress");

	$scope.progress.onclick = function(){
		console.log("Progress Bar Clicked!");
		this.style.width = "50%";
	}

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

});