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
