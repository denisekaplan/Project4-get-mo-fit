var messages = {
  mean: {
    fatty: ["Mean Fatty Message 1", "Mean Fatty Message 2", "Mean Fatty Message 3"],
    meh: ["Mean Meh Message 1", "Mean Meh Message 2", "Mean Meh Message 3"],
    healthy: ["Mean healthy Message 1", "Mean healthy Message 2", "Mean healthy Message 3"],
    fit: ["Mean fit Message 1", "Mean fit Message 2", "Mean fit Message 3"]},
  nice: {
    fatty: ["Nice Fatty Message 1", "Nice Fatty Message 2", "Nice Fatty Message 3"],
    meh: ["Nice Meh Message 1", "Nice Meh Message 2", "Nice Meh Message 3"],
    healthy: ["Nice healthy Message 1", "Nice healthy Message 2", "Nice healthy Message 3"],
    fit: ["Nice fit Message 1", "Nice fit Message 2", "Nice fit Message 3"]}
};



var runNiceMessages = function(){

    if(pInt < 25){
      setInterval(function(){
        var rNum = Math.floor(Math.random()*3);
        alert(messages.nice.fatty[rNum]); }, 60000);
      }
    else if(pInt > 24 && pInt < 50){
      setInterval(function(){
        var rNum = Math.floor(Math.random()*3);
        alert(messages.nice.meh[rNum]); }, 60000);
    }
    else if(pInt > 49 && pInt < 75){
      setInterval(function(){
        var rNum = Math.floor(Math.random()*3);
        alert(messages.nice.healthy[rNum]); }, 60000);
    }
    else {
      setInterval(function(){
        var rNum = Math.floor(Math.random()*3);
        alert(messages.nice.fit[rNum]); }, 60000);
    }
  };

  var runMeanMessages = function(){

      if(pInt < 25){
        setInterval(function(){
          var rNum = Math.floor(Math.random()*3);
          alert(messages.mean.fatty[rNum]); }, 60000);
        }
      else if(pInt > 24 && pInt < 50){
        setInterval(function(){
          var rNum = Math.floor(Math.random()*3);
          alert(messages.mean.meh[rNum]); }, 60000);
      }
      else if(pInt > 49 && pInt < 75){
        setInterval(function(){
          var rNum = Math.floor(Math.random()*3);
          alert(messages.mean.healthy[rNum]); }, 60000);
      }
      else {
        setInterval(function(){
          var rNum = Math.floor(Math.random()*3);
          alert(messages.mean.fit[rNum]); }, 60000);
      }
  };


    var attitude = localStorage.getItem('moattitude');
      console.log("mo's attitude: " + attitude);

    if(attitude == "Mean Mo"){
      runMeanMessages();
    }
    else {
      runNiceMessages();
    };


angular.module('starter.services', [])
