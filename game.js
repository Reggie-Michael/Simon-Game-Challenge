const buttonColors = ["red", "blue", "green", "yellow"]

let gamePattern = [];

let userClickedPattern = [];

let levelNo = 0;
// let level = "Level " + levelNo;

$("div.btn").on("click", function() {
     let userChosenColor = $(this).attr("id");
     userClickedPattern.push(userChosenColor);
     playSound(userChosenColor);
     animatePress(this);
     checkAnswer(userClickedPattern.length - 1);
})


function nextSequence() {

     userClickedPattern = [];
     function randomNumber (min, max) {
          min = Math.ceil (min);
          max = Math.floor (max);
          return Math.floor(Math.random() * (max - min + 1) + min);
     }

     let randomChosenColor = buttonColors[randomNumber(0,3)]

     gamePattern.push(randomChosenColor);

     let chosenButton = $("#" + randomChosenColor);
     chosenButton.fadeOut(200).fadeIn(200);
     playSound(randomChosenColor);
     levelNo++;
     $("h1#level-title").text("Level " + levelNo);

     
}

function playSound(name) {
     var audio = new Audio("./sounds/" + name + ".mp3");
     audio.play();
}

function animatePress(currentColor) {
     $(currentColor).addClass("pressed");
     function removeClass() {
          $(currentColor).removeClass("pressed");
     }
     setTimeout(removeClass, 100)
}

$(document).keydown(function() {
     if(levelNo <= 0){
          nextSequence();
          $("h1#level-title").text("Level " + levelNo)
     }
});

$("button#play").click(function() {
     if(levelNo <= 0){
          nextSequence();
          $("h1#level-title").text("Level " + levelNo)
     }
});

function checkAnswer(currentLevel){
     if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
          if(gamePattern.length === userClickedPattern.length){
               setTimeout(nextSequence, 1000)
          }
     }else {
          var audio = new Audio("./sounds/wrong.mp3");
          audio.play();
          $("body").addClass("game-over")
          setTimeout(function(){
               $("body").removeClass("game-over")
          }, 200)
          $("h1#level-title").text("Game Over, Press Any Key to Restart");
          startOver();

     }
}

function startOver() {
     levelNo = 0;
     gamePattern = [];
}
//  testing
$("button.extra").click(function(){
     if(levelNo>0){
          nextSequence();
     }
});


