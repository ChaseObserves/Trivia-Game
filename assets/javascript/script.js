$(document).ready(function() {

// GLOBAL VARIABLES
// ---------------------------------------------------
var allQuestions = [{
	question: "Who founded Facebook?",
	choices: ["Jeff Bezos", "Peter Thiel", "Mark Zuckerberg", "Tom from Myspace"],
	correctAnswer: 2
  },

  {
  	question: "Which social media platform limits postings to 140 characters?",
  	choices: ["Twitter", "Facebook", "Instagram", "Snapchat"],
  	correctAnswer: 0
  
  }
];



var questionText;
var currentQuestion = 0;
var answerOptions = [];
var questionIndex = 0;
var countCorrect = 0;
var countWrong = 0;


// FUNCTIONS
// ---------------------------------------------------

// I pulled this counter function from StackOverflow and it is honestly insane
var myCounter = new Countdown({  
    seconds:30,  // number of seconds to count down
    onUpdateStatus: function(sec){
    	$("#timer").text("Timer: " + sec);
    }, // callback for each second
    onCounterEnd: function() {
    	$("#response").empty();
		$("#choices").empty();
		$("#response").append($("<h1>").text("Times Up!"));
		countWrong++
		questionIndex++
		setTimeout(function(){
			$("#response").empty();
			renderQuestion();
		}, 3000);
    } // final action
});

function Countdown(options) {
  var timer,
  instance = this,
  seconds = options.seconds || 10,
  updateStatus = options.onUpdateStatus || function () {},
  counterEnd = options.onCounterEnd || function () {};

  function decrementCounter() {
    updateStatus(seconds);
    if (seconds === 0) {
      counterEnd();
      instance.stop();
    }
    seconds--;
  }

  this.start = function () {
    clearInterval(timer);
    timer = 0;
    seconds = options.seconds;
    timer = setInterval(decrementCounter, 1000);
  };

  this.stop = function () {
    clearInterval(timer);
  };
}

// The rest of this code I wrote myself from my head with very light Google-fu and I've never been more proud of anything in my life.

var gameReset = function() {
	questionText;
	currentQuestion = 0;
	answerOptions = [];
	questionIndex = 0;
	countCorrect = 0;
	countWrong = 0;
	startGame();
}

var startGame = function() {
	$("#question").empty();
	var welcome = $("<h1>").text("Click below to start the game!");
	var startButton = $("<button class='btn btn-large' id='start-button'>").text("START");
	$("#question").append(welcome, startButton);

	$("#start-button").on("click", function() {
		$("#question").empty();
		renderQuestion();
	});
};

var renderQuestion = function() {
	myCounter.start();
	if (questionIndex == allQuestions.length) {
		$(".info").empty();
		$("#question").append($("<h1>").text("Game Over!"));
		$("#choices").append($("<h3>").text("Total Correct: " + countCorrect));
		$("#response").append($("<h3>").text("Total Incorrect: " + countWrong));
		var playAgain = $("<button class='btn btn-large' id='play-button'>").text("PLAY AGAIN");
		$("#response").append(playAgain);
		myCounter.stop();

	}
	else {
		$(".info").empty();
		currentQuestion = allQuestions[questionIndex];
		questionText = $("<h1>").text(currentQuestion.question);
		$("#question").append(questionText);
		for (var i = 0; i < currentQuestion.choices.length; i++) {
			answerOptions = $("<button class='btn btn-large' id='btn-choice'></button><br><br>");
			answerOptions.addClass("choice");
			answerOptions.attr("data-index", i);
			answerOptions.text(currentQuestion.choices[i]);
			$("#choices").append(answerOptions);
		};
	};

	$("#play-button").on("click", function() {
		$(".info").empty();
		gameReset();
	});

	$(".choice").on("click", function() {
		myCounter.stop();
		var selectedAnswer = $(this).attr('data-index');
		$("#choices").empty();
		if (selectedAnswer == currentQuestion.correctAnswer) {
			$("#response").append($("<h1>").text("Correct!"));
			countCorrect++
			questionIndex++
		}
		else {
			$("#response").append($("<h1>").text("Wrong :("));
			countWrong++
			questionIndex++
		}
		setTimeout(function(){
			$("#response").empty();
			renderQuestion();
		}, 3000);
	});
};

// MAIN PROCCESSES
// ---------------------------------------------------

startGame();

})