var app = (function(document){

  var button = document.getElementsByClassName("dropbtn")[0];
  var text1 = function() {
  button.innerHTML = "easy";
  };
  var text2 = function() {
  button.innerHTML = "medium";
  };
  var text3 = function() {
  button.innerHTML = "hard";
  };
  var gameCounts = {};
  var flippedCards = [];
  var numberOfMoves = 0;
  document.getElementById("count").innerHTML = numberOfMoves;
  var levelEasy = ["fa fa-bluetooth fa-5x", "fa fa-fort-awesome fa-5x", "fa fa-reddit-alien fa-5x", "fa fa-hashtag fa-5x", "fa fa-bolt fa-5x", "fa fa-diamond fa-5x", "fa fa-coffee fa-5x", "fa fa-gift fa-5x"];
  var levelMedium = ["fa fa-heart fa-5x","fa fa-twitter fa-5x", "fa fa-tripadvisor fa-5x", "fa fa-slack fa-5x", "fa fa-reddit-alien fa-5x", "fa fa-pagelines fa-5x", "fa fa-github-square fa-5x", "fa fa-optin-monster fa-5x", "fa fa-drupal fa-5x", "fa fa-codepen fa-5x", "fa fa-fort-awesome fa-5x", "fa fa-venus fa-5x", "fa fa-mercury fa-5x", "fa fa-mars fa-5x", "fa fa-rocket fa-5x", "fa fa-university fa-5x", "fa fa-paper-plane-o fa-5x", "fa fa-moon-o fa-5x" ];
  var levelHard = []
  var makeBackgrounds = function(gameArray) {
    function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
  return shuffleArray(gameArray.concat(gameArray));

  }

var flip = function(event) {
  var flipped = event.target.closest(".card");

  if(flipped.classList[1] === 'clicked'){
    return;
  }
  flipped.classList.toggle('clicked');
  flippedCards.push(flipped);

  if (flippedCards.length == 2) {
    numberOfMoves++;
    document.getElementById("count").innerHTML = numberOfMoves;

    if(flippedCards[0].getAttribute('match') == flippedCards[1].getAttribute('match')) {
      gameCounts.left -= 2;
      flippedCards[0].style.opacity = "0";
      flippedCards[1].style.opacity = "0";
      flippedCards[0].style.transition = "1s";
      flippedCards[1].style.transition = "1s";
      if(gameCounts.left == 0){
        flippedCards = [];
        endGame();
        return;
      }
    }
    setTimeout(function() {  arr.forEach(function(element){
          element.className = "card";
      });}, 1000);

    var bla = document.querySelectorAll(".clicked");
    var arr = Array.prototype.slice.call(bla);
    flippedCards = [];
  }
};

var createCards = function(color) {

  var card = document.createElement('DIV');
  card.classList.add('card');
  card.setAttribute('match', color);
  card.addEventListener('click', app.flip);

  var flipper = document.createElement('DIV');
  flipper.classList.add('flipper');

  var front = document.createElement('DIV');
  front.classList.add('front');


  var back = document.createElement('DIV');
  back.classList.add('back');

  var icon = document.createElement('I');
  icon.setAttribute("class",color);


  card.appendChild(flipper);
  flipper.appendChild(front);
  flipper.appendChild(back);
  back.appendChild(icon);
  document.querySelector('.page2').appendChild(card);
};

var playerName = undefined;
var newGame = function() {
  var gameArray = [];
  numberOfMoves = "0";
  document.querySelector(".outter").style.display = "block";
  document.querySelector(".page").style.display = "none";
  playerName = document.getElementsByTagName("INPUT")[0].value;
  var gameDifficulty = button.innerHTML;
  document.querySelector("#player").innerHTML = playerName;



  if (gameDifficulty == "easy") {
    document.querySelector(".page2").style.maxWidth = "600px";
    document.querySelector(".page2").style.maxHeight = "600px";
    document.querySelector("#difficulty").innerHTML = "EASY";
    document.querySelector("#finalDifficulty").innerHTML = "EASY";
    gameArray = makeBackgrounds(levelEasy);
    gameCounts.total = gameArray.length;
    gameCounts.left = gameArray.length;
    for(var i = 0; i < 4*4 ; i++) {
      createCards(gameArray[i]);
    }
  }
  else if (gameDifficulty == "medium") {
    document.querySelector(".page2").style.minWidth = "800px";
    document.querySelector(".page2").style.minHeight = "800px";
    document.querySelector("#difficulty").innerHTML = "MEDIUM";
    document.querySelector("#finalDifficulty").innerHTML = "MEDIUM";
    gameArray = makeBackgrounds(levelMedium);
    gameCounts.total = gameArray.length;
    gameCounts.left = gameArray.length;
    for(var i = 0; i < 6*6 ; i++) {
      createCards(gameArray[i]);
    }
  }
  else {
    document.querySelector(".page2").style.minWidth = "1350px";
    document.querySelector(".page2").style.minHeight = "900px";
    document.querySelector("#difficulty").innerHTML = "HARD";
    document.querySelector("#finalDifficulty").innerHTML = "HARD";
    gameArray = makeBackgrounds(levelHard);
    gameCounts.total = gameArray.length;
    gameCounts.left = gameArray.length;
    for(var i = 0; i < 8*8 ; i++) {
      createCards(gameArray[i]);
    }
  }


    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    interval = setInterval(setTime, 1000);
    function setTime(){
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds%60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
    }
    function pad(val){
        var valString = val + "";
        if(valString.length < 2)
        {
            return "0" + valString;
        }
        else
        {
            return valString;
        }
    }
}

var interval = undefined;
var stopTime = function() {
  clearTimeout(interval);
}

var endGame = function() {
  var count = document.querySelector("#count").innerHTML;
  document.querySelector("#finalNOM").innerHTML = count;
  var minutes = document.getElementById("minutes").innerHTML;
  var seconds = document.getElementById("seconds").innerHTML;
  var totalTime = minutes + ":" + seconds;
  document.querySelector("#finalTime").innerHTML = totalTime;
  document.querySelector("#finalPlayer").innerHTML = playerName;
  var modal = document.querySelector(".modalDialog");
  var difficulty = document.querySelector("#finalDifficulty").innerHTML;
  stopTime();
  modal.style.opacity = "1";
  modal.style.pointerEvents = "auto";
  calculateHighScore(totalTime,count);
};
var NOM = document.querySelector("#count").innerHTML;
var highScores = function() {
  document.getElementById("count").innerHTML = 0;
  document.querySelector("#newGame").style.display = "block";
  document.querySelector("#difficulty").innerHTML = "";
  document.getElementsByTagName("INPUT")[0].value = "PLAYER"
  document.querySelector(".outter").style.display = "none";
  document.querySelector(".page3").style.display = "block";
  document.querySelector(".modalDialog").style.opacity = "0";
  document.querySelector(".modalDialog").style.pointerEvents = "none";
  document.querySelector(".dropbtn").innerHTML = "Select difficulty";
  var card = document.querySelectorAll(".card");
  for(var i = 0; i < card.length; i++){
  document.getElementsByClassName("page2")[0].removeChild(card[i]);
}
};

var mainScreen = function() {
  document.querySelector("#newGame").style.display = "none"
  document.querySelector(".page3").style.display = "none";
  document.querySelector(".page").style.display = "block";
}

var storage = function(player, res) {
  if(!localStorage.getItem("highScores")) {
    localStorage.setItem("highScores", JSON.stringify([]))
  }
  var scores = JSON.parse(localStorage.getItem("highScores"));
  scores.push({name: player, score: res});
  localStorage.setItem("highScores", JSON.stringify(scores))
  var HS = JSON.parse(localStorage.getItem('highScores'));
  postHighScores(HS);
};

var calculateHighScore = function(time, numberOfMoves) {
  var timeInSec = (Number(time.slice(1, 2))*60) + Number(time.slice(3, 5));
  var res = (Math.round((1 / timeInSec) * (1 / numberOfMoves) * 1000000));
  storage(playerName, res);
};

var postHighScores = function(HS) {
var sorted = HS.sort(function(a, b) {
	return b.score - a.score;
});
console.log(sorted);
var list ='';
for(var i = 0; i < 11; i++){
  list += "<li>" + sorted[i].name + "    " + sorted[i].score + "</li>";
}
document.querySelector(".easyList").innerHTML = list;

};








return {
  text1: text1,
  text2: text2,
  text3: text3,
  newGame: newGame,
  makeBackgrounds: makeBackgrounds,
  createCards: createCards,
  flip: flip,
  endGame: endGame,
  stopTime: stopTime,
  highScores: highScores,
  mainScreen: mainScreen,
  storage: storage,
  calculateHighScore: calculateHighScore,
  postHighScores: postHighScores





}

})(window.document);
