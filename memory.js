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
  var levelEasy = ["green", "black", "yellow", "brown", "white", "purple", "red", "gray"];
  var levelMedium = ["#D490B2","#90D4B2", "#9090D4", "#90D4B2", "#FF7F24", "#36FF24", "#24A3FF", "FF24B2", "silver", "gold", "beige", "gray", "purple", "blue", "green", "red", "white", "black" ];
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
  back.style.backgroundColor = color;



  card.appendChild(flipper);
  flipper.appendChild(front);
  flipper.appendChild(back);
  document.querySelector('.page2').appendChild(card);
};

var newGame = function() {
  var gameArray = [];

  document.querySelector(".outter").style.display = "block";
  document.querySelector(".page").style.display = "none";
  var playerName = document.getElementsByTagName("INPUT")[0].value;
  var gameDifficulty = button.innerHTML;
  document.querySelector("#player").innerHTML = playerName;


  if (gameDifficulty == "easy") {
    document.querySelector(".page2").style.maxWidth = "600px";
    document.querySelector(".page2").style.maxHeight = "600px";
    document.querySelector("#difficulty").innerHTML = "EASY";
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
    setInterval(setTime, 1000);
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

var endGame = function() {
  var modal = document.querySelector(".modalDialog");
  modal.style.opacity = "1";
  modal.style.pointerEvents = "auto";
}










return {
  text1: text1,
  text2: text2,
  text3: text3,
  newGame: newGame,
  makeBackgrounds: makeBackgrounds,
  createCards: createCards,
  flip: flip,
  endGame: endGame




}

})(window.document);
