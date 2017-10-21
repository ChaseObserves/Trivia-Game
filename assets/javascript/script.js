$(document).ready(function() {

// GLOBAL VARIABLES
// ---------------------------------------------------
var allQuestions = [{
	question: "In the children's book series, where is Paddington Bear originally from?",
	choices: ["India", "Peru", "Canada", "Iceland"],
	correctAnswer: 1
  },

  {
  	question: "What letter must appear at the beginning of the registration number of all non-military aircraft in the U.S.?",
  	choices: ["N", "A", "U", "L"],
  	correctAnswer: 0
  
  },

  {
  	question: "Who delivered the less famous two-hour speech that preceded Abraham Lincoln's two-minute Gettysburg Address?",
  	choices: ["Wendell Phillips", "Daniel Webster", "Robert G. Ingersoll", "Edward Everett"],
  	correctAnswer: 3
  },

  {
  	question: "'Nephelococcygia' is the practice of doing what?",
  	choices: ["Finding shapes in clouds", "Sleeping with your eyes open", "Breaking glass with your voice", "Swimming in freezing water"],
  	correctAnswer: 0
  },

  {
  	question: "Which insect shorted out an early supercomputer and inspired the term 'computer bug'?",
  	choices: ["Moth", "Roach", "Fly", "Japanese Beetle"],
  	correctAnswer: 0
  },

  {
  	question: "Which of the following men does not have a chemical element named for him?",
  	choices: ["Albert Einstein", "Niels Bohr", "Isaac Newton", "Enrico Fermi"],
  	correctAnswer: 2
  },

  {
  	question: "Which of these ships was not one of the three taken over by colonists during the Boston Tea Party?",
  	choices: ["Eleanor", "Dartmouth", "Beaver", "William"],
  	correctAnswer: 3
  },

  {
  	question: "Now used to refer to a cat, the word 'tabby' is derived from the name of a district of what world capital?",
  	choices: ["Baghdad", "New Delhi", "Cairo", "Moscow"],
  	correctAnswer: 0
  },

  {
  	question: "Which First Lady was a ninth-generation descendant of Pocahontas?",
  	choices: ["Helen Taft", "Edith Wilson", "Bess Truman", "Mamie Eisenhower"],
  	correctAnswer: 1
  },

  {
  	question: "For ordering his favorite beverages on demand, LBJ had four buttons installed in the Oval Office labeled 'coffee,' 'tea,' 'Coke,' and what?",
  	choices: ["Fresca", "V8", "Yoo-hoo", "A&W"],
  	correctAnswer: 0
  },

  {
  	question: "Khrushchev's famous 1960 'shoe-banging' outburst at the U.N. was in response to a delegate from what nation?",
  	choices: ["Australia", "The Netherlands", "The Philippines", "Turkey"],
  	correctAnswer: 2
  },

  {
  	question: "The most watched TV episode of all time, the final episode of M*A*S*H aired at 8:30 p.m. on February 28, 1983, following what sitcom?",
  	choices: ["Private Benjamin", "Square Pegs", "Alice", "Newhart"],
  	correctAnswer: 2
  },

  {
  	question: "Which of the following landlocked countries is entirely contained within another country?",
  	choices: ["Lesotho", "Burkina Faso", "Mongolia", "Luxembourg"],
  	correctAnswer: 0
  },

  {
  	question: "Who did artist Grant Wood use as the model for the farmer in his classic painting 'American Gothic'?",
  	choices: ["Traveling salesman", "Local sheriff", "His dentist", "His butcher"],
  	correctAnswer: 2
  },

  {
  	question: "Which of these U.S. Presidents appeared on the television series 'Laugh-In'?",
  	choices: ["Lyndon Johnson", "Richard Nixon", "Jimmy Carter", "Gerald Ford"],
  	correctAnswer: 1
  },
];



var questionText;
var currentQuestion = 0;
var answerOptions = [];
var questionIndex = 0;
var countCorrect = 0;
var countWrong = 0;
var coolButton = ("<button style='margin-top:30px;' class='set_1_btn Vbtn-1' id='start-button'><svg preserveAspectRatio='xMidYMin'>"
	+ "<rect x='0' y='0' fill='none' width='100%'' height='100%'></rect></svg>"
	+ "</button>")


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
	var welcome = $("<h1>").text("Can you answer these million dollar questions?");
	var startButton = $(coolButton).append("START");
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
		var playAgain = $("<button style='margin-top:30px;' class='btn btn-warning btn-large' id='play-button'>").text("PLAY AGAIN");
		$("#response").append(playAgain);
		myCounter.stop();

	}
	else {
		$(".info").empty();
		currentQuestion = allQuestions[questionIndex];
		questionText = $("<h1>").text(currentQuestion.question);
		$("#question").append(questionText);
		for (var i = 0; i < currentQuestion.choices.length; i++) {
			answerOptions = $("<button style='margin:15px;' class='btn btn-warning btn-large' id='btn-choice'></button>");
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