
// Variables for storing data

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStartFlag = 0;
var level = 0;


// Plays button sound

function playSound(name) {
  var music = new Audio("./sounds/"+name+".mp3");
  music.play();
}

// Function tracking score, sequence, flashing buttons and playing music
// Uses .pressed class to animate

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $('#'+randomChosenColour).addClass('pressed');
  setTimeout(()=>{$('#'+randomChosenColour).removeClass('pressed');}, 100);
  level += 1;
  $('#level-title').text('Level ' + level);
}

// Event listener
// Could use var p = $(this).attr("id");
// Uses fadeIn and fadeOut to animate

$('.btn').click(function(e){
  var userChosenColour = event.target.id;
  $('#'+userChosenColour).fadeOut(100).fadeIn(100);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  gameCheck(userClickedPattern.length-1);
});

function gameCheck(index) {
  if (!userClickedPattern || !gamePattern) {
    return 1;
  }

  if (userClickedPattern[index] === gamePattern[index]) {
    if (userClickedPattern.length === gamePattern.length) {
      if (gameStartFlag == 1) {
        setTimeout(()=>{nextSequence()}, 1000);
      }
    }
  } else {
      gamePattern = [];
      userClickedPattern = [];
      playSound('wrong');
      gameStartFlag = 0;
      level = 0;
      $('body').addClass('game-over');
      setTimeout(()=>{$('body').removeClass('game-over')},200);
      $('#level-title').text('Game Over, Press Any Key to Restart');
    }
}

$(document).keypress(()=> {
  if (gameStartFlag === 0) {
    nextSequence();
    gameStartFlag = 1;
    $('#level-title').text('Level ' + level);
  }
});

// THIS IMPLEMENTATION OF GAME CHECK WORKS BUT IT IS UNNECESSARY DIFFICULT AND LONG
// function gameCheck() {
//    var wrong = new Audio('./sounds/wrong.mp3');
//    if (!userClickedPattern || !gamePattern) {
//      return 1;
//    }
//
//   if (userClickedPattern[-1] != gamePattern[-1]){
//     gamePattern = [];
//     userClickedPattern = [];
//     playSound('wrong');
//     gameStartFlag = 0;
//     level = 0;
//     $('body').addClass('game-over');
//     setTimeout(()=>{$('body').removeClass('game-over')},200);
//     $('#level-title').text('Game Over, Press Any Key to Restart');
//   } else {
//       if (userClickedPattern.length === gamePattern.length) {
//         for (var i=0; i<=gamePattern.length; i++){
//           if (userClickedPattern[i] != gamePattern[i]){
//             gamePattern = [];
//             userClickedPattern = [];
//             playSound('wrong');
//             gameStartFlag = 0;
//             level = 0;
//             $('body').addClass('game-over');
//             setTimeout(()=>{$('body').removeClass('game-over')},200);
//             $('#level-title').text('Game Over, Press Any Key to Restart');
//             break;
//           }
//         }
//         if (gameStartFlag == 1) {
//           setTimeout(()=>{nextSequence()}, 1000);
//         }
//       }
//     }
// }
