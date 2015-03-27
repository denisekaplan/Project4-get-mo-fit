var totalworkouts;
var pInt;

if(pInt == null){
	pInt = 1;
}



///////////////  LOGIN LOGOUT HISTORY (Decrement progress bar)///////

// console log last login
console.log("last login: " + localStorage.getItem('lastlogin'));

// get new login date
var newLogin = Date.now();
console.log("new login: " + newLogin);

// get old login if it exists
if(localStorage.getItem('lastlogin') != null){
	// if it exists, set old login to this
	var oldLogin = localStorage.getItem('lastlogin');
}
else{
	// if it doesn't exist, set it to the new login
	localStorage.setItem('lastlogin', newLogin);
}

// get difference betweent the two dates
var logindiff = Math.round((newLogin - oldLogin) / 1000);
var loginminutes = Math.round(logindiff / 60);
console.log("seconds between last login = " + logindiff + ' seconds');
console.log("minutes between last login: " + loginminutes + " minutes");

// after we get difference set old login to new login
  localStorage.setItem('lastlogin', newLogin);

////////// END LOGOUT LOGIN HISTORY ////////////////////



var totalpoints = 0;

angular.module('starter.controllers', [])





.controller('DashCtrl', function($scope) {

	//////////// PROGRESS BAR /////////////////////

		var progressfunction = function(){
			// get progress bar by id
			var progressbar = document.getElementById("progress");
			// get total points, store in x
			var x = parseInt(localStorage.getItem('totalpoints'));
			// z = totalpoints - minutes in between login
			var z = x - loginminutes;
			// reset total points

			// limit to 1%
			if(z <= 0) {
				z = 1;
			};
			localStorage.setItem('totalpoints', z);
			// set p == total points
			p = localStorage.getItem('totalpoints');
			console.log("p = " + p);
			// if p is not null, set progress bar width to totalpoints percent
			if(p != null){
		  	progress = p + '%';
		  }
			// if p is null, set progress to 1%
			else {
				progress = '1%';
			}
			console.log("progress bar at: " + progress);
			// set the bar width = to p
			progressbar.style.width = progress;

			// convert p to integer
			pInt = parseInt(p);

			console.log("pInt: "+ pInt);
			// if pInt is greater than 50, turn progress bar green, less than 50, 50
			if(pInt > 49){
				progressbar.style.background = "green";
			}
			else {
				progressbar.style.background = "red";
			}

		}
		progressfunction();

	/////////// END PROGRESS BAR //////////////////

})

.controller('ActivitiesCtrl', function($scope) {


})

.controller('WorkoutsCtrl', function($scope){

	/// GET WORKOUTS FROM LOCAL STORAGE ///
	  if(localStorage.getItem('totalworkoutarray') != null){
	  	totalworkouts = JSON.parse(localStorage.getItem('totalworkoutarray'));
	  }
		else {
	  	totalworkouts = [];
	  }
		console.log("Totalpoints in localstorage: " + localStorage.getItem('totalpoints'));

	///////////////// SAVE WORKOUT FUNCTION ////////////////////////
	  $scope.saveWorkout = function(date,duration,activity){

			// single workout
	  	var workout = {
	  		date: date,
	  		duration: parseInt(duration),
	  		activity: activity
	  	};
	  	console.log("Now I'm logging the workout " + workout);


			///// ADD POINTS FUNCTION ///////
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
			///// END ADD POINTS FUNCTION /////

			// run the addpoints function
			addpoints();


			// ADD WORKOUT TO TOTAL WORKOUTS //

	  	totalworkouts.push(workout);
			console.log("This is logging the totalworkouts array with the new object " + totalworkouts);

	  	// To check if the newest workout is pushing to total workouts array.
	  	console.log(totalworkouts + "push");
	  	var totalworkoutsstring = JSON.stringify(totalworkouts);

	  	localStorage.setItem('totalworkoutarray', totalworkoutsstring);
	  }
	//////////// END SAVE WORKOUT FUNCTION ///////////////////////////////////////


	// set $scope.logs to total workouts so that we can call them in the view
		$scope.logs = totalworkouts;

})


.controller('StepsCtrl', function($scope) {

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
