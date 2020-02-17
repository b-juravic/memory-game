// Image classes for card backs
var classes = ["beach1", "beach2", "surfboard1", "surfboard2", "cat1", "cat2", "flower1", "flower2", "coffee1", "coffee2", "beach1", "beach2", "surfboard1", "surfboard2", "cat1", "cat2", "flower1", "flower2", "coffee1", "coffee2"];

//New game button event listener
var newGame = document.getElementById("new-game-btn");
newGame.addEventListener("click", function(event) {
  handlerFuncs.assignImages();
  handlerFuncs.resetScore();
  handlerFuncs.highScore();
});

var TwoMaxClicks = 0;
var cardsFlippedId = [];

// Event listener for card clicks
var flipCard = document.getElementById("card-collection");
flipCard.addEventListener("click", function(event) {
  var itemClicked = event.target;
  if (itemClicked.parentNode.classList.contains("card") && TwoMaxClicks === 0) {
    var cardId = parseInt(itemClicked.parentNode.id);
    cardsFlippedId.push(cardId);
    TwoMaxClicks++;
    handlerFuncs.flip(cardId);
    handlerFuncs.scorePlusOne();
  } else if (itemClicked.parentNode.classList.contains("card") && TwoMaxClicks === 1) {
    var cardId = parseInt(itemClicked.parentNode.id);
    cardsFlippedId.push(cardId);
    TwoMaxClicks++;
    handlerFuncs.flip(cardId);
    handlerFuncs.scorePlusOne();
    var firstCardId = cardsFlippedId[0];
    var secondCardId = cardsFlippedId[1];
    var firstCard = document.getElementById(firstCardId);
    var secondCard = document.getElementById(secondCardId);
    var firstCardImageClass = firstCard.children[1].classList.value;
    var secondCardImageClass = secondCard.children[1].classList.value;
    if (firstCardImageClass !== secondCardImageClass) {
      handlerFuncs.flipBack(firstCardId);
      handlerFuncs.flipBack(secondCardId);
    }
    setTimeout(function () {
      TwoMaxClicks= 0;
      cardsFlippedId = [];
    }, 2000);
  }
  // if all matches found, game over and grab score to compare with local highest score
  var matchedCards = document.getElementsByClassName("is-flipped");
  var matchedCount = 0;
  for (var i = 0; i < matchedCards.length; i++) {
    matchedCount++;
  }
  if (matchedCount === 20) {
    var highScore = localStorage.getItem("highScore");
    var scoreElement = document.getElementById("score");
    var currentGameScore = parseInt(scoreElement.innerText);
    if (highScore === null || currentGameScore < highScore) {
      localStorage.setItem("highScore", currentGameScore);
    }
  }
});

var handlerFuncs = {
  flip: function (id) {
    // flips "clicked" card over
    var cardToFlip = document.getElementById(id);
    cardToFlip.classList.toggle('is-flipped');
  },
  flipBack: function (id) {
    // flips card back over with 2 second delay
    var cardToFlip = document.getElementById(id);
    setTimeout(function(id) {cardToFlip.classList.toggle('is-flipped'); }, 2000);
  },
  scorePlusOne: function () {
    // increases score by 1
    var scoreElement = document.getElementById("score");
    var score = parseInt(scoreElement.innerText);
    score++;
    scoreElement.innerText = score;
  },
  resetScore: function () {
    //resets score to zero
    var scoreElement = document.getElementById("score");
    scoreElement.innerText = 0;
  },
  assignImages: function () {
    //assigns random class to card backs for image
    var cards = document.getElementsByClassName("card");
    var counter = 20;
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      card.className = "container card";
      var cardBack = card.children[1];
      //resets cardBack class to "back" only
      cardBack.className = "back";
      var randomIndex = Math.floor(Math.random() * Math.floor(counter));
      cardBack.classList.add(classes[randomIndex]);
      classes.splice(randomIndex, 1);
      counter--
    }
    handlerFuncs.resetCalssesArr();
  },
  resetCalssesArr: function () {
    //reset array of classes to include all
    classes = ["beach1", "beach2", "surfboard1", "surfboard2", "cat1", "cat2", "flower1", "flower2", "coffee1", "coffee2", "beach1", "beach2", "surfboard1", "surfboard2", "cat1", "cat2", "flower1", "flower2", "coffee1", "coffee2"];
  },
  highScore: function () {
    var highScore = localStorage.getItem("highScore");
    var highScoreElement = document.getElementById("high-score");
    highScoreElement.innerText = highScore;
  }
}

// Assign random images to card back when page loads or on refresh && display highest game score
window.onload = handlerFuncs.assignImages();
window.onload = handlerFuncs.highScore();