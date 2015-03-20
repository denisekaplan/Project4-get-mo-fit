angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

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
  $scope.settings = {
    enableFriends: true
  };
});
