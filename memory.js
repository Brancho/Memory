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

  var flippedCards = [];
  var numberOfMoves = 0;
var flip = function(event) {
  var flipped = event.target.closest(".card").classList.toggle('clicked');
  flippedCards.push(flipped);
  if (flippedCards.length == 2) {
    numberOfMoves++;
    document.getElementById("count").innerHTML = numberOfMoves;
    flippedCards = [];

  }
};

var createCards = function() {
  var card = document.createElement('DIV');
  card.classList.add('card');
  card.addEventListener('click', app.flip);

  var flipper = document.createElement('DIV');
  flipper.classList.add('flipper');


  var front = document.createElement('DIV');
  front.classList.add('front');


  var back = document.createElement('DIV');
  back.classList.add('back');

  card.appendChild(flipper);
  flipper.appendChild(front);
  flipper.appendChild(back);
  document.querySelector('.page2').appendChild(card);
};

var newGame = function() {
  document.querySelector(".outter").style.display = "block";
  document.querySelector(".page").style.display = "none";
  var playerName = document.getElementsByTagName("INPUT")[0].value;
  var gameDifficulty = button.innerHTML;
  document.querySelector("#player").innerHTML = playerName;


  if (gameDifficulty == "easy") {
    document.querySelector(".page2").style.maxWidth = "600px";
    document.querySelector(".page2").style.maxHeight = "600px";
    document.querySelector("#difficulty").innerHTML = "EASY";

    for(var i = 0; i < 4*4 ; i++) {
      createCards();
    }
  }
  else if (gameDifficulty == "medium") {
    document.querySelector(".page2").style.minWidth = "800px";
    document.querySelector(".page2").style.minHeight = "800px";
    document.querySelector("#difficulty").innerHTML = "MEDIUM";
    for(var i = 0; i < 6*6 ; i++) {
      createCards();
    }
  }
  else {
    document.querySelector(".page2").style.minWidth = "1350px";
    document.querySelector(".page2").style.minHeight = "900px";
    document.querySelector("#difficulty").innerHTML = "HARD";
    for(var i = 0; i < 8*8 ; i++) {
      createCards();
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










return {
  text1: text1,
  text2: text2,
  text3: text3,
  newGame: newGame,
  createCards: createCards,
  flip: flip


}

})(window.document);
