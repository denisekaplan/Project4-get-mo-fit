angular.module('starter.services', [])

.factory('Activities', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var activities = [{
    id: 0,
    name: 'Running',
    date: "10/31/2249",
    duration: '30 minutes'
  }, {
    id: 1,
    name: 'Ice Skating',
    date: "10/31/2249",
    duration: '30 minutes'
  }, {
    id: 2,
    name: 'Yoga',
    date: "10/31/2249",
    duration: '30 minutes'
  }, {
    id: 3,
    name: 'Strength Training',
    date: "10/31/2249",
    duration: '30 minutes'
  }, {
    id: 4,
    name: 'Power Walking',
    date: "10/31/2249",
    duration: '30 minutes'
  }];

  return {
    all: function() {
      return activities;
    },
    remove: function(activity) {
      activities.splice(activities.indexOf(activity), 1);
    },
    get: function(activityId) {
      for (var i = 0; i < activities.length; i++) {
        if (activities[i].id === parseInt(activityId)) {
          return activities[i];
        }
      }
      return null;
    }
  };
});
