let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let hasGameStarted = false;
let level = 0;

$(document).keypress(function () { //Checks for the first keypress
    //Only changes the h1 if the game has started
    if (!hasGameStarted) {

        $("#level-title").text("Level " + level);
        nextSequence();
        hasGameStarted = true;

    }

})

$(".btn").click(function() {

    let userChosenColor = $(this).attr("id"); //Gets the id of the button that was clicked
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor); //Plays corresponding sound every time a certain button is clicked
    animatePress(userChosenColor); //Plays the corresponding animation every time a certain button is clicked
    checkAnswer(userClickedPattern.length - 1); //Verifies if the user is correct or not
  
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver(); //Restarts everything if the gamePattern and the userClickedPattern do not match
    }
}

function nextSequence() {

    userClickedPattern = [];
    level++; //Updates level by 1 every time its called
    $("#level-title").text("Level " + level); //Changes the h1 to the current level

    let randomNumber = Math.floor(Math.random() * 4); //Generates a random number between 0 and 3
    let randomChosenColor = buttonColors[randomNumber]; //Picks a random color based on the randomNumber
    gamePattern.push(randomChosenColor); //Stores the colors and the pattern

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //Provides the animation to the corresponding colored button
    playSound(randomChosenColor);

}

function playSound (name) {
    //Plays the corresponding sound based on the chosen color which is passed as a parameter
    let audio = new Audio("sounds/" + name + ".mp3"); //Creates the corresponding audio of the buttons
    audio.play();

}

function animatePress (currentColor) {

    $("." + currentColor).addClass("pressed"); //In the CSS stylesheet, the pressed class has the corresponding animation that is added after every button click
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function startOver() {
    //Restarts the entire game
    level = 0;
    gamePattern = [];
    hasGameStarted = false;

  }
  