var app = (function(document){

var button = document.getElementsByClassName("dropbtn")[0];
function Game(name, difficulty, time, clicks) {
  this.name = name;
  this.difficulty = difficulty;
  this.time = time;
  this.clicks = clicks;
};


var flip = function(event) {
  event.target.classList.toggle('clicked');
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
  var playerName = document.getElementsByTagName("INPUT")[0].value;
  var gameDifficulty = button.innerHTML;
    var player = new Game(playerName, gameDifficulty);
    createCards();

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







return {
  newGame: newGame,
  Game: Game,
  createCards: createCards,
  flip: flip


}

})(window.document);

document.addEventListener("DOMContentLoaded", app.loadDoc);
